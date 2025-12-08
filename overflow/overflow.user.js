// ==UserScript==
// @name         Overflow
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Force body overflow scroll always
// @author       thegroosalugg
// @match        *://*/*
// @run-at       document-start
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/overflow/overflow.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/overflow/overflow.user.js
// ==/UserScript==

GM_addStyle(`body { overflow: auto !important; }`);

const observer = new MutationObserver(() => {
    document.body.style.overflow = 'auto';
});

observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] });
