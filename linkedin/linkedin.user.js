// ==UserScript==
// @name         Linkedin
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Filter nav items;
// @author       thegroosalugg
// @match        https://*.linkedin.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/linkedin/linkedin.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/linkedin/linkedin.user.js
// ==/UserScript==

(function () {
  "use strict";
  console.log("TamperMonkey: Linkedin Script");

  const terms = ["home", "premium", "business"];

  function cleanNav() {
    // grab only headers with a nav child (ignores toast headers)
    const headers = Array.from(document.querySelectorAll("header")).filter(h =>
      h.querySelector("nav")
    );
    const header = headers[0];
    if (!header) return;

    const navs = header.querySelectorAll("nav");
    if (!navs.length) return;

    // remove 2nd upsell nav if it exists (on some routes only)
    navs.forEach((nav, i) => {
      if (i > 0) {
        console.log("Removed upsell nav", nav);
        nav.remove();
      }
    });

    const nav = navs[0];
    if (!nav) return;

    const ul = nav.querySelector("ul");
    if (!ul) return;

    // Linkedin uses different DOMs on different routes: continue to remove upsell items from first nav
    ul.querySelectorAll("li").forEach(li => {
      if (li.querySelector(".global-nav__me")) return; // keep dropdown menu
      const text = li.textContent.trim().toLowerCase();
      if (terms.some(term => text.includes(term))) {
        console.log("Removed item:", text);
        li.remove();
      }
    });
  }

  function removeAds() {
    const adRoot = document.getElementById("react-root");
    if (adRoot) adRoot.remove();

    const adsContainer = document.getElementById("ads-container");
    if (adsContainer) adsContainer.remove();

    document.querySelectorAll(".ad-banner-container").forEach(el => el.remove());
  }

  // run once initially
  cleanNav();
  removeAds();

  // observe mutations
  const observer = new MutationObserver(() => {
    cleanNav();
    removeAds();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
