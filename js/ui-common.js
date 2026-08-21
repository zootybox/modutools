/* ===== Dark Mode ===== */
(function(){
  const themeKey='modutools_theme';
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme',t);
    try{localStorage.setItem(themeKey,t);}catch(e){}
    // Update toggle icon
    document.querySelectorAll('.theme-icon').forEach(function(el){
      el.textContent=t==='dark'?'\u2600\ufe0f':'🌙';
    });
  }
  function getTheme(){
    try{var t=localStorage.getItem(themeKey);if(t)return t;}catch(e){}
    return window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  }
  applyTheme(getTheme());
  // Listen for toggle clicks
  document.addEventListener('click',function(e){
    var btn=e.target.closest('[data-theme-toggle]');
    if(!btn)return;
    var cur=document.documentElement.getAttribute('data-theme')||'light';
    applyTheme(cur==='dark'?'light':'dark');
  });
})();

/* ===== Top Bar + Breadcrumb Injection (sidebar 대체) ===== */
(function(){
  var isToolPage=!window.location.pathname.endsWith('/')&&!window.location.pathname.endsWith('index.html');
  var currentPath=window.location.pathname.replace(/\/$/,'')||'/';

  // Category definition (사이드바 대신 breadcrumb/홈에서 재사용)
  var cats=[
    {id:'calc',emoji:'💰',label:'계산기'},
    {id:'image',emoji:'🖼️',label:'이미지'},
    {id:'text',emoji:'📝',label:'텍스트'},
    {id:'convert',emoji:'🔄',label:'변환기'},
    {id:'generate',emoji:'⚡',label:'생성기'},
    {id:'life',emoji:'🏠',label:'생활'},
    {id:'sports',emoji:'🏋️',label:'운동'}
  ];

  // 현재 페이지의 카테고리 판별 (URL 경로 기반)
  var curCat=null;
  for(var ci=0;ci<cats.length;ci++){
    if(currentPath.indexOf('/'+cats[ci].id+'/')===0){curCat=cats[ci];break;}
  }

  // 도구명 추출: <title> 또는 <h1> 에서
  var toolName='';
  var h1=document.querySelector('h1');
  if(h1){toolName=h1.textContent.replace(/\s+/g,' ').trim();}
  if(!toolName){
    var titleMatch=document.querySelector('title');
    if(titleMatch){
      toolName=titleMatch.textContent.replace(/\s+/g,' ').trim();
      toolName=toolName.replace(/\s*[|-]\s*modutools.*/i,'').replace(/\s*[|-]\s*.*$/,'').trim();
    }
  }

  // 상단 헤더 (sticky): 로고 + 다크모드 토글
  var html='<header class="tool-topbar">';
  html+='<div class="tool-topbar-inner">';
  html+='<a href="/" class="tool-logo">modu<span>tools</span></a>';
  html+='<button class="tool-theme-btn" data-theme-toggle><span class="emoji theme-icon">🌙</span></button>';
  html+='</div></header>';

  // breadcrumb: 홈 > 카테고리 > 도구명
  html+='<nav class="tool-crumb" aria-label="breadcrumb">';
  html+='<ol class="tool-crumb-list">';
  html+='<li class="tool-crumb-item"><a href="/">홈</a></li>';
  if(curCat){
    html+='<li class="tool-crumb-sep">&rsaquo;</li>';
    html+='<li class="tool-crumb-item"><a href="/#'+curCat.id+'">'+curCat.emoji+' '+curCat.label+'</a></li>';
  }
  if(isToolPage && toolName){
    html+='<li class="tool-crumb-sep">&rsaquo;</li>';
    html+='<li class="tool-crumb-item" aria-current="page">'+toolName+'</li>';
  }
  html+='</ol></nav>';

  // Mobile bottom bar (사이드바 제거 후에도 유지)
  var mhtml='<div class="mobile-bar">';
  mhtml+='<a href="/" class="mobile-bar-item'+(currentPath==='/'?' active':'')+'"><span class="emoji">🏠</span>홈</a>';
  cats.forEach(function(cat){
    var active=isToolPage&&currentPath.indexOf('/'+cat.id+'/')===0?' active':'';
    mhtml+='<a href="/#'+cat.id+'" class="mobile-bar-item'+active+'"><span class="emoji">'+cat.emoji+'</span>'+cat.label+'</a>';
  });
  mhtml+='<button class="mobile-bar-item dark-toggle" data-theme-toggle><span class="theme-icon">🌙</span></button>';
  mhtml+='</div>';

  // Inject into body
  document.body.insertAdjacentHTML('afterbegin',html);
  document.body.insertAdjacentHTML('beforeend',mhtml);

  // (사이드바 제거로 페이지 여백은 CSS에서 처리 — 여기서는 main 래핑 제거)
})();

/* ===== FAQ Accordion Toggle ===== */
document.querySelectorAll(".faq-q").forEach(function(q){
  q.addEventListener("click",function(){
    this.parentElement.classList.toggle("open");
  });
});

/* ===== Toast Notification ===== */
let toastTimer=null;
function showToast(m){
  const tt=document.getElementById("toast");
  if(!tt)return;
  tt.textContent=m;
  tt.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){tt.classList.remove("show");},2500);
}
