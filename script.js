# music player functionalities script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    const albumArt = document.getElementById('album-art');

    // Music playlist
    const songs = [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
        },
        {
            title: "Save Your Tears",
            artist: "The Weeknd",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f"
        },
        {
            title: "Starboy",
            artist: "The Weeknd ft. Daft Punk",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // Load song
    function loadSong(song) {
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        audio.src = song.src;
        albumArt.src = song.cover;
    }

    // Play song
    function playSong() {
        isPlaying = true;
        playIcon.classList.replace('fa-play', 'fa-pause');
        audio.play();
    }

    // Pause song
    function pauseSong() {
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        audio.pause();
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong();
        }
    }

    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong();
        }
    }

    // Update progress bar
    function updateProgress(e) {
        if (isPlaying) {
            const { duration, currentTime } = e.srcElement;
            // Update progress bar width
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            // Calculate display for duration
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`;
            }
            // Delay switching duration Element to avoid NaN
            if (durationSeconds) {
                durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
            }
            // Calculate display for currentTime
            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }

    // Set progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Set volume
    function setVolume() {
        audio.volume = this.value;
    }

    // Event listeners
    playBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressBar.parentElement.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);

    // Load first song
    loadSong(songs[currentSongIndex]);
});
