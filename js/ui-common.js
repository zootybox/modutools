/* FAQ Accordion Toggle */
document.querySelectorAll(".faq-q").forEach(function(q){
  q.addEventListener("click",function(){
    this.parentElement.classList.toggle("open");
  });
});

/* Toast Notification */
var toastTimer=null;
function showToast(m){
  var tt=document.getElementById("toast");
  if(!tt)return;
  tt.textContent=m;
  tt.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){tt.classList.remove("show");},2500);
}
