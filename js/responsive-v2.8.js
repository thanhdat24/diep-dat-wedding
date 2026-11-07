/*
  Nạp đồng bộ trong <head> (không defer): tỉ lệ phải có trước lần vẽ đầu tiên,
  nếu không trang sẽ hiện canvas 420px bị cắt rồi mới co lại.
*/
(function(){
  "use strict";

  var DESIGN_WIDTH=420;
  /* iPhone dọc rộng nhất 440px, chiều ngang nhỏ nhất 667px. */
  var PHONE_MAX_WIDTH=500;

  var root=document.documentElement;
  var wrapper=null;
  var shell=null;
  var ro=null;
  var raf=0;

  function applyScale(){
    var vw=root.clientWidth||window.innerWidth||DESIGN_WIDTH;
    var scale=vw<=PHONE_MAX_WIDTH?vw/DESIGN_WIDTH:1;

    root.style.setProperty("--wedding-scale",String(scale));
    root.style.setProperty("--wedding-left",(vw-DESIGN_WIDTH*scale)/2+"px");
    return scale;
  }

  function ensureShell(){
    wrapper=document.querySelector(".ladi-wraper");
    if(!wrapper)return false;

    if(wrapper.parentElement&&wrapper.parentElement.id==="wedding-responsive-shell"){
      shell=wrapper.parentElement;
      return true;
    }

    shell=document.createElement("div");
    shell.id="wedding-responsive-shell";
    wrapper.parentNode.insertBefore(shell,wrapper);
    shell.appendChild(wrapper);
    return true;
  }

  function fit(){
    var scale=applyScale();
    if(!wrapper||!shell)return;

    var h=wrapper.scrollHeight||wrapper.offsetHeight||0;
    shell.style.height=Math.ceil(h*scale)+"px";
  }

  function requestFit(){
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(fit);
  }

  function start(){
    if(!ensureShell())return;
    fit();

    if("ResizeObserver" in window){
      ro=new ResizeObserver(requestFit);
      ro.observe(wrapper);
    }

    window.addEventListener("resize",requestFit,{passive:true});
    window.addEventListener("orientationchange",function(){
      setTimeout(requestFit,120);
    },{passive:true});

    setTimeout(requestFit,250);
    setTimeout(requestFit,900);
  }

  applyScale();

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }
})();
