// ==UserScript==
// @name         Linkedin Enhanced
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Filter nav items;
// @author       thegroosalugg
// @match        https://*.linkedin.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/linkedin/linkedin.meta.js
// @downloadURL  https://github.com/thegroosalugg/tamper_monkey/releases/latest/download/linkedin.user.js
// ==/UserScript==

(function () {
  "use strict";
  console.log("TamperMonkey: Linkedin Script");

  const terms = ["home", "premium", "business"];
  const observer = new MutationObserver(() => {
    // grab only headers with a nav child # ignores linkedin toast header
    const headers = Array.from(document.querySelectorAll("header")).filter((h) =>
      h.querySelector("nav")
    );

    const header = headers[0]; // first header with nav
    if (!header) return;

    // linkedin either has 1 nav, or 2 navs for upsell buttons depending on route
    const navs = header.querySelectorAll("nav");
    if (!navs.length) return;

    // on some routes there will be a 2nd upsell nav - removed it if it exists
    navs.forEach((n, i) => {
      if (i > 0) {
        console.log("Removed upsell nav", n);
        n.remove();
      }
    });

    const nav = navs[0]; // only first nav matters
    if (!nav) return;

    const ul = nav.querySelector("ul");
    if (!ul) return;

    // filters nav list for unwanted items. On 1 nav routes, upsell nav is under same tree and uses text
    ul.querySelectorAll("li").forEach((li) => {
      const text = li.textContent.trim().toLowerCase();
      if (terms.some((term) => text.includes(term))) {
        console.log("Removed item:", text);
        li.remove();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
