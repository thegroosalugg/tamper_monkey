// ==UserScript==
// @name        Dev Server
// @namespace   http://tampermonkey.net/
// @version     0.0.2
// @description Server for testing scripts. Configured to discard cache for instant feedback on refresh
// @author      thegroosalugg
// @match       *://*/*
// @connect     localhost
// @grant       GM_xmlhttpRequest
// @updateURL   https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/.dev_server/dev_server.meta.js
// @downloadURL https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/.dev_server/dev_server.user.js
// ==/UserScript==

(function () {
  "use strict";

  // configure these manually as needed directly on TamperMonkey
  const port = "5500";
  const path = "tamper_monkey/indeed/indeed.user.js";
  const sites = ["indeed.com"];
  const tag = "[TAMPER MONKEY]"; // faster logging

  // Only run on specific domains during development
  if (!sites.some((site) => window.location.hostname.includes(site))) {
    console.log(`${tag} script cancelled: sites do not match`);
    return;
  }

  console.log(`Running script ${path} on port:${port}`);

  GM_xmlhttpRequest({
    method: "GET",
    url: `http://localhost:${port}/${path}?t=${Date.now()}`,
    onload: function (response) {
      console.log(`${tag} script fetched`);
      try {
        const script = document.createElement("script");
        script.textContent = response.responseText;
        document.head.appendChild(script);
        console.log(`${tag} server running`);
      } catch (error) {
        console.error(`${tag} script failed to execute`, error);
      }
    },
    onerror: function (error) {
      console.error(`${tag} script failed to fetch`, error);
    },
  });
})();
