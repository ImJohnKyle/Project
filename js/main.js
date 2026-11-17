var sendBtn=document.getElementById('send'),statusEl=document.getElementById('status'),nameF=document.getElementById('n'),msgF=document.getElementById('m');
function say(t,err){statusEl.textContent=(err?'\u26A0 ':'')+t;statusEl.classList.toggle('err',!!err)}
sendBtn.addEventListener('click',function(){
  var n=nameF.value.trim(),m=msgF.value.trim();
  if(!m){say('Please write a message first.',true);msgF.setAttribute('aria-invalid','true');msgF.focus();return}
  msgF.removeAttribute('aria-invalid');
  say('Opening your email app\u2026 If nothing opens, email me at johnkyleuriarte2309@gmail.com.');
  location.href='mailto:johnkyleuriarte2309@gmail.com?subject='+encodeURIComponent('Portfolio message from '+(n||'a visitor'))+'&body='+encodeURIComponent(m);
});
msgF.addEventListener('input',function(){if(msgF.value.trim()){msgF.removeAttribute('aria-invalid');if(statusEl.classList.contains('err'))say('')}});
var nav=document.querySelector('nav'),mb=document.querySelector('.menu-btn');
function setMenu(o){nav.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu')}
mb.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
[].forEach.call(document.querySelectorAll('nav ul a'),function(a){a.addEventListener('click',function(){setMenu(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
addEventListener('resize',function(){if(innerWidth>860)setMenu(false)});
var links=[].slice.call(document.querySelectorAll('nav ul a'));
var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
addEventListener('scroll',function(){
  var y=scrollY+140,i=0;secs.forEach(function(s,k){if(s.offsetTop<=y)i=k});
  links.forEach(function(a,k){a.classList.toggle('on',k===i);if(k===i)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
},{passive:true});

/* drag-to-resize grip for the message box (works with mouse, finger and pen) */
(function(){
  var grip=document.querySelector('.grip'),ta=document.getElementById('m'),y0=0,h0=0;
  if(!grip||!ta)return;
  grip.addEventListener('pointerdown',function(e){y0=e.clientY;h0=ta.offsetHeight;grip.setPointerCapture(e.pointerId);e.preventDefault()});
  grip.addEventListener('pointermove',function(e){
    if(!grip.hasPointerCapture(e.pointerId))return;
    ta.style.height=Math.max(110,Math.min(h0+e.clientY-y0,600))+'px';
  });
})();

/* click a picture to see it larger (with a close button and keyboard support) */
(function(){
  var lb=document.getElementById('lb');if(!lb)return;
  var big=lb.querySelector('img'),closeB=lb.querySelector('.lb-close'),last=null;
  function open(from){var s=from.querySelector('img');big.src=s.currentSrc||s.src;big.alt=s.alt;last=from;lb.classList.add('open');closeB.focus()}
  function close(){lb.classList.remove('open');if(last){last.focus();last=null}}
  [].forEach.call(document.querySelectorAll('.thumb'),function(b){b.addEventListener('click',function(){open(b)})});
  lb.addEventListener('click',close);
  addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='Tab'){e.preventDefault();closeB.focus()}
  });
})();

/* copy the email address (with a fallback for older browsers) */
(function(){
  var b=document.getElementById('copy'),s=document.getElementById('copy-status'),email='johnkyleuriarte2309@gmail.com',t;
  if(!b||!s)return;
  function done(ok){
    s.textContent=ok?'\u2713 Copied to clipboard':'Couldn\u2019t copy. Please copy it from the Email line above.';
    clearTimeout(t);t=setTimeout(function(){s.textContent=''},3500);
  }
  function fallback(){
    var a=document.createElement('textarea');a.value=email;a.setAttribute('readonly','');
    a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();
    var ok=false;try{ok=document.execCommand('copy')}catch(e){}
    document.body.removeChild(a);done(ok);
  }
  b.addEventListener('click',function(){
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(email).then(function(){done(true)},fallback)}
    else fallback();
  });
})();
