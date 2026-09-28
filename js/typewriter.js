/**
 * Hero Badge Typewriter Effect
 * Cycles through headline messages with realistic typing and deletion timings.
 */
(function initHeroBadgeTypewriter() {
    var badge = document.getElementById('hero-badge');
    if (!badge) return;
    var textEl = badge.querySelector('.badge-text');
    if (!textEl) return;

    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var words = ['Recherche alternance', 'Hello, World', 'Bienvenue'];
    var wordIdx = 0;
    var charIdx = words[0].length;
    var isDeleting = false;
    var typingSpeed = 80;

    function step() {
        var currentWord = words[wordIdx];

        if (isDeleting) {
            charIdx--;
            textEl.textContent = currentWord.substring(0, charIdx) || '\u00A0';
            typingSpeed = 45;
        } else {
            charIdx++;
            textEl.textContent = currentWord.substring(0, charIdx);
            typingSpeed = 85;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            badge.setAttribute('aria-label', currentWord);
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 400;
        }

        setTimeout(step, typingSpeed);
    }

    setTimeout(function () {
        isDeleting = true;
        step();
    }, 2200);
})();
