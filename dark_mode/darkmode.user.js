// ==UserScript==
// @name         Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Force dark mode on every website
// @author       thegroosalugg
// @match        *://*/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/dark_mode/darkmode.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/dark_mode/darkmode.user.js
// ==/UserScript==

(function() {
    'use strict';

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('[TAMPERMONKEY] This site has own Dark Mode');
        return;
    }

    GM_addStyle(`
        html, body {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
        }
        a, a * {
            color: #81a1c1 !important;
        }
        img, video, iframe {
            filter: brightness(0.85) !important;
        }
    `);
})();
