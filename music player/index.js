const container = document.querySelector(".container");
const play = document.getElementById("play");
const image = document.querySelector("img");
const audio = document.querySelector("audio");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const progressArea = document.querySelector(".progress-area");
const progressBar = progressArea.querySelector(".progress-bar");

const songs = [
  {
    name: "pawan1",
    title: "Dark Side(Remix)",
    artist: "Alan Walker",
  },
  {
    name: "pawan2",
    title: "One Love(Mashup)",
    artist: "Subh",
  },
  {
    name: "pawan3",
    title: "Hey Deepa Mijaj",
    artist: "Lalit Mohan Joshi",
  },
];

let isPlaying = false;
// for playing
const playMusic = () => {
  isPlaying = true;
  audio.play();
  play.classList.replace("fa-circle-play", "fa-circle-pause");
  image.classList.add("animation1");
  image.classList.add("glowing");
};
const pauseMusic = () => {
  isPlaying = false;
  audio.pause();
  play.classList.replace("fa-circle-pause", "fa-circle-play");
  image.classList.remove("animation1");
};
play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

const loadSongs = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  audio.src = `music/${songs.name}.mp3`;
  image.src = `images/${songs.name}.jpg`;
};
songIdx = 0;
//  loadSongs(songs[2]);
const nextSong = () => {
  songIdx = (songIdx + 1) % songs.length;
  loadSongs(songs[songIdx]);
  playMusic();
};

const prevSong = () => {
  songIdx = (songIdx - 1 + songs.length) % songs.length;
  loadSongs(songs[songIdx]);
  playMusic();
};
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;?
audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = document.querySelector(".current-time");
  ///////////////////////// main problrm is here///////////////////////////////

  let musicDuration = document.querySelector(".max-duration");
  audio.addEventListener("loadeddata", () => {
    //  let musicDuration = document.querySelector(".duration")
    let audioDuration = audio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);

  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  console.log("op"); 
  // [[[[[[[[[[[[[[[[[[[[[[[[problem]]]]]]]]]]]]]]]]]]]]]]]]
  let progressWidth = progressArea.clientWidth;
  let offset = e.offset;
  let songDuration = audio.duration;

  audio.currentTime = (offset / progressWidth) * songDuration;
  playMusic();
  play.classList.replace("fa-circle-play", "fa-circle-pause");
});
