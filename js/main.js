var EMAIL='johnkyleuriarte2309@gmail.com';

/* ---------- copy helper (modern API first, older-browser fallback) ---------- */
function copyText(text,cb){
  function fallback(){
    var a=document.createElement('textarea');a.value=text;a.setAttribute('readonly','');
    a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();
    var ok=false;try{ok=document.execCommand('copy')}catch(e){}
    document.body.removeChild(a);cb(ok);
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){cb(true)},fallback)}
  else fallback();
}

/* ---------- contact form: validation, clear feedback, easy recovery ---------- */
(function(){
  var form=document.getElementById('contact-form'),statusEl=document.getElementById('status'),
      nameF=document.getElementById('n'),msgF=document.getElementById('m'),copyB=document.getElementById('copy-msg'),t;
  if(!form)return;
  function say(text,err){statusEl.textContent=(err?'⚠ ':'')+text;statusEl.classList.toggle('err',!!err)}
  function submit(){
    var n=nameF.value.trim(),m=msgF.value.trim();
    copyB.hidden=true;
    if(!m){say('Please write a message first.',true);msgF.setAttribute('aria-invalid','true');msgF.focus();return}
    msgF.removeAttribute('aria-invalid');
    say('Opening your email app… If nothing opens, use “Copy my message instead” or email me at '+EMAIL+'.');
    copyB.hidden=false;
    location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Portfolio message from '+(n||'a visitor'))+'&body='+encodeURIComponent(m);
  }
  form.addEventListener('submit',function(e){e.preventDefault();submit()});
  /* shortcut for keyboard users: Ctrl+Enter or Cmd+Enter inside the message box */
  msgF.addEventListener('keydown',function(e){if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();submit()}});
  msgF.addEventListener('input',function(){
    if(msgF.value.trim()){msgF.removeAttribute('aria-invalid');if(statusEl.classList.contains('err'))say('')}
    copyB.hidden=true;
  });
  copyB.addEventListener('click',function(){
    var n=nameF.value.trim(),m=msgF.value.trim();
    copyText((n?'From: '+n+'\n\n':'')+m,function(ok){
      say(ok?'✓ Message copied. Paste it into an email to '+EMAIL+'.':'Couldn’t copy. Please select the text and copy it yourself.',!ok);
      clearTimeout(t);
    });
  });
})();

/* ---------- navigation: mobile menu with focus handling ---------- */
var nav=document.querySelector('nav'),mb=document.querySelector('.menu-btn');
function setMenu(o){nav.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu')}
mb.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
[].forEach.call(document.querySelectorAll('nav ul a'),function(a){a.addEventListener('click',function(){setMenu(false)})});
addEventListener('keydown',function(e){
  if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);mb.focus()}   /* Esc closes and returns focus to the button */
});
document.addEventListener('click',function(e){
  if(nav.classList.contains('open')&&!nav.contains(e.target))setMenu(false);        /* tap outside closes the menu */
});
addEventListener('resize',function(){if(innerWidth>860)setMenu(false)});

/* ---------- navigation: show where you are (also on first load) ---------- */
(function(){
  var links=[].slice.call(document.querySelectorAll('nav ul a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function update(){
    var y=scrollY+140,i=0;
    secs.forEach(function(s,k){if(s.offsetTop<=y)i=k});
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)i=links.length-1;  /* bottom of page = last item */
    links.forEach(function(a,k){a.classList.toggle('on',k===i);if(k===i)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  }
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
  update();
})();

/* ---------- dark / light switch (remembers the choice, starts from the device setting) ---------- */
(function(){
  var root=document.documentElement,b=document.getElementById('theme');if(!b)return;
  var ico=b.querySelector('.theme-ico'),lab=b.querySelector('.theme-label'),meta=document.querySelector('meta[name="theme-color"]'),mq=matchMedia('(prefers-color-scheme:dark)');
  function now(){return root.getAttribute('data-theme')||(mq.matches?'dark':'light')}
  function show(){
    var dark=now()==='dark';
    ico.textContent=dark?'☀️':'🌙';
    lab.textContent=dark?'Light mode':'Dark mode';   /* names what a click will switch to */
    if(meta)meta.setAttribute('content',dark?'#0f2547':'#bfeaff');
  }
  b.hidden=false;
  b.addEventListener('click',function(){
    var next=now()==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
    show();
  });
  if(mq.addEventListener)mq.addEventListener('change',function(){if(!root.hasAttribute('data-theme'))show()});
  show();
})();

/* ---------- message box: grows with the text, and can still be dragged taller ---------- */
(function(){
  var grip=document.querySelector('.grip'),ta=document.getElementById('m'),y0=0,h0=0;
  if(!ta)return;
  ta.addEventListener('input',function(){
    if(ta.scrollHeight>ta.clientHeight)ta.style.height=Math.min(ta.scrollHeight+6,600)+'px';
  });
  if(!grip)return;
  grip.addEventListener('pointerdown',function(e){y0=e.clientY;h0=ta.offsetHeight;grip.setPointerCapture(e.pointerId);e.preventDefault()});
  grip.addEventListener('pointermove',function(e){
    if(!grip.hasPointerCapture(e.pointerId))return;
    ta.style.height=Math.max(110,Math.min(h0+e.clientY-y0,600))+'px';
  });
})();

/* ---------- enlarge a picture: named dialog, background locked, focus kept ---------- */
(function(){
  var lb=document.getElementById('lb');if(!lb)return;
  var big=lb.querySelector('img'),closeB=lb.querySelector('.lb-close'),last=null,
      behind=[].slice.call(document.querySelectorAll('nav,main,footer,.theme'));
  function open(from){
    var s=from.querySelector('img');
    big.src=s.currentSrc||s.src;big.alt=s.alt;last=from;
    lb.setAttribute('aria-label',(from.getAttribute('aria-label')||'View larger').replace('View larger','Enlarged picture'));
    behind.forEach(function(el){el.setAttribute('inert','')});
    document.body.style.overflow='hidden';
    lb.classList.add('open');closeB.focus();
  }
  function close(){
    lb.classList.remove('open');
    behind.forEach(function(el){el.removeAttribute('inert')});
    document.body.style.overflow='';
    if(last){last.focus();last=null}
  }
  [].forEach.call(document.querySelectorAll('.thumb'),function(b){b.addEventListener('click',function(){open(b)})});
  lb.addEventListener('click',close);
  addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='Tab'){e.preventDefault();closeB.focus()}
  });
})();

/* ---------- copy the email address ---------- */
(function(){
  var b=document.getElementById('copy'),s=document.getElementById('copy-status'),t;
  if(!b||!s)return;
  b.addEventListener('click',function(){
    copyText(EMAIL,function(ok){
      s.textContent=ok?'✓ Copied to clipboard':'Couldn’t copy. Please copy it from the Email line above.';
      clearTimeout(t);t=setTimeout(function(){s.textContent=''},3500);
    });
  });
})();
