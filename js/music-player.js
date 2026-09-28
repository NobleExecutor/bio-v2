/**
 * Persona 3 Reload — Audio Music Player Engine
 * Controls the spinning CD disc, Makoto Yuki stick MP3 player SVG, and soundtrack playlist.
 */
(function initP3RMusicPlayer() {
    var playerWidget = document.getElementById('p3r-player');
    if (!playerWidget) return;

    var cdWrap = document.getElementById('cd-wrap');
    var cdDisc = document.getElementById('cd-disc');
    var cdBadge = document.getElementById('cd-badge');
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

    // Audio lifecycle events
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
