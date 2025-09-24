// ==UserScript==
// @name         Linkedin Enhanced
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Filter nav items;
// @author       thegroosalugg
// @match        https://*.linkedin.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/linkedin/linkedin.meta.js
// @downloadURL  https://github.com/thegroosalugg/tamper_monkey/releases/latest/download/linkedin.user.js
// ==/UserScript==

(function() {
    'use strict';

    const terms = ['home'];
    const observer = new MutationObserver(() => {
        const navItems = document.querySelectorAll('li.global-nav__primary-item');
        navItems.forEach(item => {
            const label = item.querySelector('.global-nav__primary-link-text');
            if (label && terms.includes(label.textContent.trim().toLowerCase())) {
                item.remove();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
