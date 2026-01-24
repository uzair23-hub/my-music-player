let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let masterImg = document.getElementById('masterImg');
let masterTitle = document.getElementById('masterTitle');

let audio = new Audio();
let songIndex = 0;

// Songs List (Paths check karlein ke folders ke naam same hon)
const songs = [
    { name: 'Arz Kiya Hai', image: 'images/aryz.jpg', path: 'audio/audio1 .mp3.mp3' },
    { name: 'Still Rollin', image: 'images/still rollin.jpg', path: 'audio/audio3.mp3.mp3' },
    { name: 'Heeriye', image: 'images/heeriye.jpg', path: 'audio/audio4.mp3.mp3' },
    { name: 'Softly', image: 'images/softly.jpg', path: 'audio/audio2 .mp3.mp3' }
];

// Function to Play Song
const playSong = (index) => {
    songIndex = index;
    audio.src = songs[songIndex].path;
    masterImg.src = songs[songIndex].image;
    masterTitle.innerText = songs[songIndex].name;
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
}

// Master Play/Pause
masterPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        if(!audio.src) playSong(0);
        else audio.play();
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    } else {
        audio.pause();
        masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
});

// Card Buttons
document.querySelectorAll('.playMusic').forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = parseInt(e.target.id);
        playSong(index);
    });
});

// Progress Bar Update
audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// Forward/Backward
document.getElementById('forward').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById('backward').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});