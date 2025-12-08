// ==UserScript==
// @name         Clean URL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Continuously remove junk query parameters like vjk
// @author       thegroosalugg
// @match        *://*/*
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/clean_url/clean_url.meta.js
// @downloadURL  https://raw.githubusercontent.com/thegroosalugg/tamper_monkey/main/clean_url/clean_url.user.js
// ==/UserScript==

(function() {
    const junk = ['vjk', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];

    function cleanURL() {
        const url = new URL(window.location);
        let changed = false;
        for (const key of junk) {
            if (url.searchParams.has(key)) {
                url.searchParams.delete(key);
                changed = true;
            }
        }
        if (changed) {
            const clean = url.origin + url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '') + url.hash;
            history.replaceState(null, '', clean);
        }
    }

    // Run immediately and on any future URL change
    cleanURL();

    for (const fn of ['pushState', 'replaceState']) {
        const original = history[fn];
        history[fn] = function(...args) {
            const result = original.apply(this, args);
            cleanURL();
            return result;
        };
    }

    window.addEventListener('popstate', cleanURL);
})();
