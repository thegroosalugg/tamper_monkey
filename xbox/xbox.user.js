// ==UserScript==
// @name         xCloud Pop-Ups
// @namespace    https://github.com/
// @version      1.0
// @description  Remove xCloud pop-ups
// @author       thegroosalugg
// @license      MIT
// @match        https://www.xbox.com/*/play*
// @match        https://www.xbox.com/*/auth/msa?*loggedIn*
// @exclude      https://www.xbox.com/*/xbox-game-pass/play-day-one
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/xbox/xbox.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/xbox/xbox.user.js
// ==/UserScript==

(function() {
  'use strict';

  const style = document.createElement('style');
  style.textContent = `
    /* F9 mouse release bubble */
    div[class^="MouseKeyboardTeachingBubble-module__entireScreen"] {
      display: none !important;
    }

    /* Click or tap here to continue playing */
    div[class^="NotFocusedDialog-module__container"] {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
})();
