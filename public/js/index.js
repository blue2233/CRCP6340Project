"use strict";
/* ==========================================================================
   IIFE (Immediately Invoked Function Expression)
   Source: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
   Notes: IIFE is an idiom in which a JavaScript function runs as soon as it is defined. It is also known as a self-executing anonymous function. 
   ========================================================================== */
(() => {
document.querySelector("#testButton").addEventListener("click", handleClick);

function handleClick() {
  console.log("Thank you for clicking.");
}
})();