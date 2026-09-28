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

// ========================================================
// Persona 3 Reload Music Player Engine
// ========================================================
(function initP3RMusicPlayer() {
    var playerWidget = document.getElementById('p3r-player');
    if (!playerWidget) return;

    var cdWrap = document.getElementById('cd-wrap');
    var cdDisc = document.getElementById('cd-disc');
    var cdBadge = document.getElementById('cd-badge');
    var mp3Panel = document.getElementById('mp3-panel');
    var closeBtn = document.getElementById('p3r-player-close');
    var audio = document.getElementById('audio-player');
    var titleDisplay = document.getElementById('title-display');
    var trackBadge = document.getElementById('track-badge');
    var currentTimeEl = document.getElementById('current-time');
    var totalTimeEl = document.getElementById('total-time');
    var progressBar = document.getElementById('progress-bar');
    var progressFill = document.getElementById('progress-fill');
    var btnPlay = document.getElementById('btn-play');
    var btnPrev = document.getElementById('btn-prev');
    var btnNext = document.getElementById('btn-next');
    var trackSelect = document.getElementById('track-select');
    var volSlider = document.getElementById('vol-slider');
    var lcdTitle = document.getElementById('lcd-title');
    var lcdTime = document.getElementById('lcd-time');

    if (!audio) return;

    var playlist = [
        { title: "Full Moon Full Life", file: "assets/music/Full Moon Full Life.mp3" },
        { title: "Color Your Night", file: "assets/music/Color Your Night.mp3" },
        { title: "When The Moon's Reaching Out Stars", file: "assets/music/When The Moon's Reaching Out Stars -Reload-.mp3" },
        { title: "Changing Seasons", file: "assets/music/Changing Seasons -Reload-.mp3" },
        { title: "巌戸台分寮 -Reload-", file: "assets/music/巌戸台分寮 -Reload-.mp3" },
        { title: "Mass Destruction -Reload-", file: "assets/music/Mass Destruction -Reload-.mp3" },
        { title: "It's Going Down Now", file: "assets/music/It's Going Down Now.mp3" },
        { title: "全ての人の魂の戦い", file: "assets/music/全ての人の魂の戦い.mp3" },
        { title: "キミの記憶 -Reload-", file: "assets/music/キミの記憶 -Reload-.mp3" }
    ];

    var currentTrackIdx = 0;
    try {
        var savedIdx = parseInt(localStorage.getItem('p3r_track_idx'), 10);
        if (!isNaN(savedIdx) && savedIdx >= 0 && savedIdx < playlist.length) {
            currentTrackIdx = savedIdx;
        }
    } catch (_) {}

    try {
        var savedVol = parseFloat(localStorage.getItem('p3r_volume'));
        if (!isNaN(savedVol) && savedVol >= 0 && savedVol <= 1) {
            audio.volume = savedVol;
            if (volSlider) volSlider.value = savedVol;
        } else {
            audio.volume = 0.7;
        }
    } catch (_) {
        audio.volume = 0.7;
    }

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return "00:00";
        var mins = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        return (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    }

    function formatLcdTitle(str) {
        if (!str) return "NO TRACK";
        var clean = str.toUpperCase().trim();
        if (clean.length > 11) {
            return clean.substring(0, 11) + '...';
        }
        return clean;
    }

    function updatePlayState(isPlaying) {
        if (cdDisc) {
            if (isPlaying) {
                cdDisc.classList.remove('paused');
                cdDisc.classList.add('spinning');
            } else {
                cdDisc.classList.remove('spinning');
                cdDisc.classList.add('paused');
            }
        }
        if (cdBadge) {
            cdBadge.textContent = isPlaying ? '❚❚' : '▶';
        }
        if (btnPlay) {
            btnPlay.textContent = isPlaying ? '❚❚' : '▶';
            btnPlay.setAttribute('aria-label', isPlaying ? 'Pause' : 'Lecture');
        }
        if (lcdTime) {
            var icon = isPlaying ? '▶ ' : '❚❚ ';
            lcdTime.textContent = icon + formatTime(audio.currentTime);
        }
    }

    function loadTrack(idx, autoPlay) {
        currentTrackIdx = (idx + playlist.length) % playlist.length;
        var track = playlist[currentTrackIdx];
        audio.src = encodeURI(track.file);

        if (titleDisplay) titleDisplay.textContent = track.title;
        if (trackBadge) trackBadge.textContent = '0' + (currentTrackIdx + 1) + '/0' + playlist.length;
        if (trackSelect) trackSelect.value = currentTrackIdx;
        if (lcdTitle) lcdTitle.textContent = formatLcdTitle(track.title);

        if (progressFill) progressFill.style.width = '0%';
        if (progressBar) progressBar.setAttribute('aria-valuenow', '0');
        if (currentTimeEl) currentTimeEl.textContent = '00:00';

        try {
            localStorage.setItem('p3r_track_idx', currentTrackIdx);
        } catch (_) {}

        if (autoPlay) {
            audio.play().catch(function() {
                updatePlayState(false);
            });
        }
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play().then(function() {
                updatePlayState(true);
            }).catch(function() {
                updatePlayState(false);
            });
        } else {
            audio.pause();
            updatePlayState(false);
        }
    }

    function nextTrack() {
        loadTrack(currentTrackIdx + 1, true);
    }

    function prevTrack() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            loadTrack(currentTrackIdx - 1, true);
        }
    }

    // Event listeners on audio
    audio.addEventListener('play', function() {
        updatePlayState(true);
    });

    audio.addEventListener('pause', function() {
        updatePlayState(false);
    });

    audio.addEventListener('ended', function() {
        nextTrack();
    });

    audio.addEventListener('timeupdate', function() {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            var pct = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = pct + '%';
            if (progressBar) progressBar.setAttribute('aria-valuenow', Math.round(pct));
        }
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
        if (lcdTime) {
            var icon = audio.paused ? '❚❚ ' : '▶ ';
            lcdTime.textContent = icon + formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('loadedmetadata', function() {
        if (totalTimeEl && !isNaN(audio.duration)) {
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    });

    // Control buttons
    if (btnPlay) btnPlay.addEventListener('click', togglePlay);
    if (btnNext) btnNext.addEventListener('click', nextTrack);
    if (btnPrev) btnPrev.addEventListener('click', prevTrack);

    if (trackSelect) {
        trackSelect.addEventListener('change', function() {
            var selectedIdx = parseInt(this.value, 10);
            if (!isNaN(selectedIdx)) {
                loadTrack(selectedIdx, true);
            }
        });
    }

    if (volSlider) {
        volSlider.addEventListener('input', function() {
            var val = parseFloat(this.value);
            audio.volume = val;
            try {
                localStorage.setItem('p3r_volume', val);
            } catch (_) {}
        });
    }

    // Seek on progress bar
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            var rect = progressBar.getBoundingClientRect();
            var pos = (e.clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));
            if (!isNaN(audio.duration) && audio.duration > 0) {
                audio.currentTime = pos * audio.duration;
            }
        });

        progressBar.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                audio.currentTime = Math.max(0, audio.currentTime - 5);
            }
        });
    }

    function closePlayer(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        playerWidget.classList.remove('expanded');
        playerWidget.classList.add('closed');
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }
    }

    function openPlayer() {
        playerWidget.classList.remove('closed');
        playerWidget.classList.add('expanded');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePlayer);
        closeBtn.addEventListener('touchend', function(e) {
            closePlayer(e);
        });
    }

    // CD Interaction: Click CD to open/toggle player
    if (cdWrap) {
        cdWrap.addEventListener('click', function(e) {
            e.stopPropagation();
            if (playerWidget.classList.contains('expanded') && !playerWidget.classList.contains('closed')) {
                closePlayer(e);
            } else {
                openPlayer();
            }
        });

        cdWrap.addEventListener('mouseenter', function() {
            playerWidget.classList.remove('closed');
        });

        cdWrap.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (playerWidget.classList.contains('expanded') && !playerWidget.classList.contains('closed')) {
                    closePlayer(e);
                } else {
                    openPlayer();
                }
            }
        });
    }

    // When mouse leaves the player widget, reset closed flag so hover can work next time
    playerWidget.addEventListener('mouseleave', function() {
        playerWidget.classList.remove('closed');
        playerWidget.classList.remove('expanded');
    });

    document.addEventListener('click', function(e) {
        if (!playerWidget.contains(e.target)) {
            playerWidget.classList.remove('expanded');
            playerWidget.classList.remove('closed');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !document.body.classList.contains('lock') && playerWidget.classList.contains('expanded')) {
            closePlayer(e);
        }
    });

    // Expose for external access or testing
    window.p3rAudioPlayer = {
        play: function() { return audio.play(); },
        pause: function() { audio.pause(); },
        togglePlay: togglePlay,
        nextTrack: nextTrack,
        prevTrack: prevTrack,
        loadTrack: loadTrack,
        openPlayer: openPlayer,
        closePlayer: closePlayer,
        getAudio: function() { return audio; },
        getPlaylist: function() { return playlist; }
    };

    // Initial setup
    loadTrack(currentTrackIdx, false);
    updatePlayState(false);
})();