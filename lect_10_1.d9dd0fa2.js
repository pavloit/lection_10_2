!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");e.addEventListener("click",(function(){e.setAttribute("disabled","true"),r.removeAttribute("disabled"),a=setInterval(o,1e3)})),r.addEventListener("click",(function(){e.removeAttribute("disabled"),r.setAttribute("disabled","true"),clearInterval(a)}));var a=1;function o(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}r.setAttribute("disabled","true")}();
//# sourceMappingURL=lect_10_1.d9dd0fa2.js.map