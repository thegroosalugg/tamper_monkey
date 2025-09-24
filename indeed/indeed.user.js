// ==UserScript==
// @name         Indeed Enhanced
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Add infinite scroll; filter search results;
// @author       thegroosalugg
// @match        https://*.indeed.com/*
// @match        https://*.indeed.de/*
// @match        https://*.indeed.*/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/indeed/indeed.meta.js
// @downloadURL  https://github.com/thegroosalugg/tamper_monkey/releases/latest/download/indeed.user.js
// ==/UserScript==

(function () {
  "use strict";

  // **WATCH == update these values if site DOM changes
  const liSelector = "li.css-1ac2h1w"; // **WATCH
  const containerSelector = "#mosaic-provider-jobcards"; // **WATCH

  const getResults = (doc = document) => doc.querySelectorAll(liSelector);
  const getContainer = () => document.querySelector(containerSelector);

  // --- filter search results ---
  function filterResults() {
    const terms = ["senior", "lead"]; // **FILTER
    const h2Selector = "h2.jobTitle span[title]"; // **WATCH

    getResults().forEach((li) => {
      const span = li.querySelector(h2Selector);
      const match = terms.some((term) => span?.title.toLowerCase().includes(term));
      if (match) {
        console.log("Removed:", span?.title);
        li.remove();
      }
    });
  }

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
    const results = getResults(doc);
    const container = getContainer();

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

  function observeResults() {
    const container = getContainer();
    if (!container) return;
    const observer = new MutationObserver(filterResults);
    observer.observe(container, { childList: true, subtree: true });
  }

  // --- Bootstrap ---
  function init() {
    observeResults();
    infiniteScroll();
  }

  init();
})();
