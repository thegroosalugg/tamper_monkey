// ==UserScript==
// @name         JobFilter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Filter search terms on selected sites;
// @author       thegroosalugg
// @match        *://*/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/stepstone/stepstone.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/stepstone/stepstone.user.js
// ==/UserScript==

(function () {
  "use strict";

  const tag   = "[TAMPER MONKEY]"; // faster logging
  const host  = window.location.hostname; // currently visited site
  const sites = [
    { domain: "indeed.com",   selector: "li.css-1ac2h1w"     },
    { domain: "stepstone.de", selector: "article.res-4cwuay" },
  ]; // update manually

  const matchedSite = sites.find(({ domain }) => host.endsWith(domain));
  if (!matchedSite) {
    console.log(`${tag} no action taken`);
    return;
  }

  console.log(`${tag} executing filter on ${host}`);

  const terms = ["senior", "lead"]; // **FILTER

  function filterResults() {
    document.querySelectorAll(matchedSite.selector).forEach((li) => {
      const h2 = li.querySelector("h2"); // these semantics likely followed on all sites
      const match = terms.some((term) => h2?.innerText.toLowerCase().includes(term));
      if (match) {
        console.log("Removed:", h2?.innerText);
        li.remove();
      }
    });
  }

  const observer = new MutationObserver(filterResults);
  observer.observe(document.body, { childList: true, subtree: true });
})();
