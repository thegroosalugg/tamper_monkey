// ==UserScript==
// @name         StepStone Enhanced
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Filter search terms;
// @author       thegroosalugg
// @match        https://*.stepstone.de/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/stepstone/stepstone.meta.js
// @downloadURL  https://github.com/thegroosalugg/tamper_monkey/releases/latest/download/stepstone.user.js
// ==/UserScript==

(function () {
  "use strict";

  const terms = ["senior", "lead"]; // **FILTER
  const observer = new MutationObserver(() => {
    const articles = document.querySelectorAll("article.res-4cwuay");
    articles.forEach((article) => {
      const h2 = article.querySelector("h2");
      const match = terms.some((term) => h2?.innerText.toLowerCase().includes(term));
      if (match) {
        console.log("Removed:", h2?.innerText);
        article.remove();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
