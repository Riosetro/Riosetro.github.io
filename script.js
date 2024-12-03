document.addEventListener('DOMContentLoaded', () => {
    // Список песен
    const songs = [
        {
            title: "Turbo (Majestic)",
            artist: "Big Baby Tape",
            cover: "./images/majestic.jpg",
            audio: "./music/Majestic.mp3"
        },
        {
            title: "BLACK RUSSIA",
            artist: "Instasamka",
            cover: "./images/instasamka2.jpg",
            audio: "./music/instasamka.mp3"
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    
    const musicPlayer = document.querySelector('.music-player');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.querySelector('.play-pause');
    const songNameElement = document.querySelector('.song-name');
    const artistNameElement = document.querySelector('.artist-name');
    const albumCoverElement = document.querySelector('.album-cover');

    // Сначала убираем класс playing
    musicPlayer.classList.remove('playing');

    function changeSong() {
        musicPlayer.classList.add('changing');
        
        setTimeout(() => {
            loadSong();
            musicPlayer.classList.remove('changing');
            musicPlayer.classList.add('new-song');
            
            setTimeout(() => {
                musicPlayer.classList.remove('new-song');
            }, 500);
            
            if (isPlaying) {
                playSong();
            }
        }, 500);
    }

    function loadSong() {
        const song = songs[currentSongIndex];
        songNameElement.textContent = song.title;
        artistNameElement.textContent = song.artist;
        albumCoverElement.src = song.cover;
        audioPlayer.src = song.audio;
    }

    function playSong() {
        audioPlayer.muted = false;
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicPlayer.classList.add('playing');
            }).catch(error => {
                console.error('Ошибка воспроизведения:', error);
                isPlaying = false;
                musicPlayer.classList.remove('playing');
                // Пробуем воспроизвести после взаимодействия
                document.addEventListener('click', () => {
                    playSong();
                }, { once: true });
            });
        }
    }

    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        musicPlayer.classList.remove('playing');
    }

    // Обработчик клика по кнопке play/pause
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // Когда песня закончилась
    audioPlayer.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        changeSong();
    });

    // Инициализация с автовоспроизведением
    loadSong();
    // Пытаемся воспроизвести после небольшой задержки
    setTimeout(() => {
        playSong();
    }, 100);

    const card = document.querySelector('.card');
    
    // Typing animation
    const text = 'lua, c++, java';
    const typingText = document.querySelector('.typing-text');
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting && charIndex < text.length) {
            typingText.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else if (!isDeleting && charIndex === text.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Пауза перед удалением
        } else if (isDeleting && charIndex > 0) {
            typingText.textContent = text.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 50);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            setTimeout(type, 1000); // Пауза перед новым набором
        }
    }

    // Start typing animation
    setTimeout(type, 1000);

    // 3D card effect
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset card position when mouse leaves
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Add glowing effect to social buttons on hover
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
});
