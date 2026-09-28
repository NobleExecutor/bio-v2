var menu = document.getElementById('menu');
var openB = document.getElementById('open');
var closeB = document.getElementById('close');
var controlClose = document.getElementById('control-close');
var controlConfirm = document.getElementById('control-confirm');
var desc = document.getElementById('mdesc');
var sideNum = document.getElementById('p3r-side-num');
var bgVideo = menu ? menu.querySelector('.menu-video') : null;
var options = [].slice.call(document.querySelectorAll('.p3r-opt'));
var idx = 0;

var navSound = new Audio('assets/sfx/navigation.wav');
navSound.volume = 0.5;

function playSound() {
    try {
        navSound.currentTime = 0;
        navSound.play().catch(function () { });
    } catch (_) { }
}


function sel(i, playSfx) {
    console.log("SEL CALLED with index=" + i + " stack=" + new Error().stack);

    if (playSfx !== false && i !== idx) {
        playSound();
    }
    idx = (i + options.length) % options.length;
    options.forEach(function (opt, k) {
        opt.classList.toggle('selected', k === idx);
    });
    if (desc && options[idx]) {
        desc.textContent = options[idx].getAttribute('data-d') || '';
    }
    if (sideNum) {
        sideNum.innerHTML = '<span>0' + (idx + 1) + '</span>';
    }
}

function activateCurrent() {
    if (!options[idx]) return;
    var href = options[idx].getAttribute('data-href');
    close();
    if (href) {
        var target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function open() {
    playSound();
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    openB.setAttribute('aria-expanded', 'true');
    document.body.classList.add('lock');
    if (bgVideo) {
        bgVideo.play().catch(function () { });
    }
    sel(0, false);
    var firstBtn = options[0] ? options[0].querySelector('.p3r-opt-btn') : null;
    if (firstBtn) firstBtn.focus();
}

function close() {
    playSound();
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    openB.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock');
    if (bgVideo) {
        bgVideo.pause();
    }
    openB.focus();
}

if (openB) openB.addEventListener('click', open);
if (closeB) closeB.addEventListener('click', close);
if (controlClose) {
    controlClose.addEventListener('click', close);
    controlClose.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            close();
        }
    });
}
if (controlConfirm) {
    controlConfirm.addEventListener('click', activateCurrent);
    controlConfirm.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activateCurrent();
        }
    });
}

options.forEach(function (opt, k) {
    var btn = opt.querySelector('.p3r-opt-btn');
    if (!btn) return;

    btn.addEventListener('mouseenter', function () {
        sel(k, true);
    });

    btn.addEventListener('focus', function () {
        sel(k, true);
    });

    btn.addEventListener('click', function () {
        idx = k;
        activateCurrent();
    });
});

document.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('open')) return;

    if (e.key === 'Escape') {
        e.preventDefault();
        close();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        sel(idx + 1, true);
        var nextBtn = options[idx] ? options[idx].querySelector('.p3r-opt-btn') : null;
        if (nextBtn) nextBtn.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        sel(idx - 1, true);
        var prevBtn = options[idx] ? options[idx].querySelector('.p3r-opt-btn') : null;
        if (prevBtn) prevBtn.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCurrent();
    }
});

var backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

if (backToTop) {
    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

window.p3rMenu = { open: open, close: close, sel: sel };
if (window.location.hash === '#menu-open') {
    open();
}

// Hero Badge Typewriter Effect
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