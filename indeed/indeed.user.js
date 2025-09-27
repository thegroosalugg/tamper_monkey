// ==UserScript==
// @name         Indeed Enhanced
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Add infinite scroll;
// @author       thegroosalugg
// @match        https://*.indeed.com/*
// @match        https://*.indeed.de/*
// @match        https://*.indeed.*/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/indeed/indeed.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/indeed/indeed.user.js
// ==/UserScript==

(function () {
  "use strict";

  // **WATCH == update these values if site DOM changes
  const liSelector = "li.css-1ac2h1w"; // **WATCH
  const containerSelector = "#mosaic-provider-jobcards"; // **WATCH

  // --- Infinite scroll logic ---
  const pageSize = 10; // **WATCH
  let nextStart = pageSize;
  let loading = false;

  async function loadMore() {
    if (loading) return;
    loading = true;
    console.log("\n\nFetching...");

    const url = new URL(window.location.href);
    url.searchParams.set("start", nextStart);

    const resp = await fetch(url.toString(), { credentials: "include" });
    const text = await resp.text();
    const doc = new DOMParser().parseFromString(text, "text/html");
    const results = doc.querySelectorAll(liSelector);
    const container = document.querySelector(containerSelector);

    results.forEach((result) => {
      container.appendChild(result);
    });

    nextStart += pageSize;
    loading = false;
    console.log("results fetched:", results.length, "\n\n");
  }

  function infiniteScroll() {
    window.addEventListener("scroll", () => {
      const hasScrolled =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (hasScrolled) loadMore();
    });
  }

  infiniteScroll();
})();
