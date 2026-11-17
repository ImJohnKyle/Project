document.getElementById('send').addEventListener('click',function(){
  var n=document.getElementById('n').value.trim(),m=document.getElementById('m').value.trim();
  location.href='mailto:johnkyleuriarte2309@gmail.com?subject='+encodeURIComponent('Portfolio message from '+(n||'a visitor'))+'&body='+encodeURIComponent(m);
});
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
  links.forEach(function(a,k){a.classList.toggle('on',k===i)});
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

/* click a certificate to see it larger */
(function(){
  var lb=document.getElementById('lb');if(!lb)return;var big=lb.querySelector('img');
  [].forEach.call(document.querySelectorAll('.thumb'),function(b){
    b.addEventListener('click',function(){var s=b.querySelector('img');big.src=s.currentSrc||s.src;big.alt=s.alt;lb.classList.add('open')});
  });
  lb.addEventListener('click',function(){lb.classList.remove('open')});
  addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')});
})();
