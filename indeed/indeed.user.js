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

  const tag        = "[TAMPER MONKEY]"; // faster logging
  const ulSelector = "#mosaic-provider-jobcards"; // **WATCH
  const liSelector = "li.css-1ac2h1w"; // **WATCH

  // --- Infinite scroll logic ---
  const pageSize   = 10; // **WATCH
  let nextStart    = pageSize;
  let lastScrollY  = 0; // Track last scroll position
  let isLoading    = false;
  let hasTriggered = false; // Prevent multiple triggers at bottom of page
  let hasEnded     = false; // Track if we've reached the end

  function getId(element) {
    const getText = (selector) => element.querySelector(selector)?.innerText.trim();
    const title   = getText("h2");
    const company = getText(".company_location"); // **WATCH
    if (!title || !company) return null;
    return `${title} ${company}`;
  }

  async function loadMore() {
    if (isLoading || hasEnded) return;
    isLoading    = true;
    hasTriggered = true;
    console.clear();
    console.log(`\n\n ${tag} Fetching...`);

    const url   = new URL(window.location.href);
    url.searchParams.set("start", nextStart);
    const resp  = await fetch(url.toString(), { credentials: "include" });
    const text  = await resp.text();
    const doc   = new DOMParser().parseFromString(text, "text/html");
    const items = doc.querySelectorAll(liSelector);
    const list  = document.querySelector(ulSelector);

    // Get existing job IDs
    const existingIds = new Set();
    document.querySelectorAll(liSelector).forEach((li) => {
      const id = getId(li);
      if (id) existingIds.add(id);
    });
    // console.log(existingIds);

    let count = 0; // count fetched items
    items.forEach((item) => {
      const id = getId(item);
      if (!existingIds.has(id)) {
        list.appendChild(item);
        count++;
      }
    });

    // If no new items were added, we've reached the end
    if (count === 0) {
      hasEnded = true;
      console.log(`${tag} End of list!`);
    } else {
      nextStart += pageSize;
      console.log(`${tag} New items added: ${count} out of ${items.length} fetched\n\n`);
    }

    isLoading = false;
  }

  function infiniteScroll() {
    window.addEventListener("scroll", () => {
      if (hasEnded) return;

      const currentScrollY  = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 750;

      if (!nearBottom) hasTriggered = false;
      if (isScrollingDown && nearBottom && !hasTriggered) loadMore();

      lastScrollY = currentScrollY;
    });
  }

  infiniteScroll();
})();
