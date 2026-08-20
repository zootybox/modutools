/* ===== Dark Mode ===== */
(function(){
  const themeKey='modutools_theme';
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme',t);
    try{localStorage.setItem(themeKey,t);}catch(e){}
    // Update toggle icon
    document.querySelectorAll('.theme-icon').forEach(function(el){
      el.textContent=t==='dark'?'\u2600\ufe0f':'\U0001f319';
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

/* ===== Sidebar Injection ===== */
(function(){
  // Only inject if sidebar doesn't already exist in HTML
  if(document.querySelector('.sidebar'))return;

  var isToolPage=!window.location.pathname.endsWith('/')&&!window.location.pathname.endsWith('index.html');
  var currentPath=window.location.pathname.replace(/\/$/,'')||'/';

  // Category definition
  var cats=[
    {id:'calc',emoji:'\U0001f4b0',label:'계산기'},
    {id:'image',emoji:'\U0001f5bc\ufe0f',label:'이미지'},
    {id:'text',emoji:'\U0001f4dd',label:'텍스트'},
    {id:'convert',emoji:'\U0001f504',label:'변환기'},
    {id:'generate',emoji:'\u26a1',label:'생성기'},
    {id:'life',emoji:'\U0001f3e0',label:'생활'},
    {id:'sports',emoji:'\U0001f3cb\ufe0f',label:'운동'}
  ];

  // Build sidebar HTML
  var html='<aside class="sidebar">';
  html+='<a href="/" class="sidebar-logo">modu<span>tools</span></a>';
  html+='<nav class="sidebar-nav">';
  html+='<a href="/" class="sidebar-item'+(currentPath==='/'?' active':'')+'"><span class="emoji">\U0001f3e0</span> 홈</a>';
  html+='<div class="sidebar-divider"></div>';
  cats.forEach(function(cat){
    var active=isToolPage&&currentPath.indexOf('/'+cat.id+'/')===0?' active':'';
    html+='<a href="/#'+cat.id+'" class="sidebar-item'+active+'"><span class="emoji">'+cat.emoji+'</span> '+cat.label+'</a>';
  });
  html+='</nav>';
  html+='<div class="sidebar-footer">';
  html+='<button class="sidebar-toggle" data-theme-toggle><span class="emoji theme-icon">\U0001f319</span> <span>테마 변경</span></button>';
  html+='</div>';
  html+='</aside>';

  // Mobile bottom bar
  var mhtml='<div class="mobile-bar">';
  mhtml+='<a href="/" class="mobile-bar-item'+(currentPath==='/'?' active':'')+'"><span class="emoji">\U0001f3e0</span>홈</a>';
  cats.forEach(function(cat){
    var active=isToolPage&&currentPath.indexOf('/'+cat.id+'/')===0?' active':'';
    mhtml+='<a href="/#'+cat.id+'" class="mobile-bar-item'+active+'"><span class="emoji">'+cat.emoji+'</span>'+cat.label+'</a>';
  });
  mhtml+='<button class="mobile-bar-item dark-toggle" data-theme-toggle><span class="theme-icon">\U0001f319</span></button>';
  mhtml+='</div>';

  // Inject into body
  document.body.insertAdjacentHTML('afterbegin',html);
  document.body.insertAdjacentHTML('beforeend',mhtml);

  // Wrap main content in .main-area if not already wrapped
  if(!document.querySelector('.main-area')){
    var mainContent=document.querySelector('main, .page, .main');
    if(mainContent){
      var wrapper=document.createElement('div');
      wrapper.className='main-area';
      mainContent.parentNode.insertBefore(wrapper,mainContent);
      wrapper.appendChild(mainContent);
      // Also move footer into main-area
      var footer=document.querySelector('.mt-footer');
      if(footer)wrapper.appendChild(footer);
    }
  }
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
