const progressBars = document.querySelectorAll('.video__controls input');
const progress = document.querySelector('.video__progress');
const video = document.querySelector('.video__frame');
const bigVideoButton = document.querySelector('.video__button');
const togglePlayButton = document.querySelector('.video__toggle-play');
const currentTime = document.querySelector('.video__current-time');
const durationTime = document.querySelector('.video__duration-time');
const volume = document.querySelector('.video__toggle-volume');
const volumeRange = document.querySelector('.video__volume-range');
const speedRange = document.querySelector('.video__speed-range');
const resetSpeed = document.querySelector('.video__reset-speed');
const speedText = document.querySelector('.video__speed-text');
const skipButtons = document.querySelectorAll('.video__skip[data-skip]');
const videoButtonsBlock = document.querySelector('.video__buttons');

progressBars.forEach(progress => {
    progress.addEventListener('input', function() {
        let value;
        switch (progress.name) {
            case 'volume':
                value = this.value * 100;
                break;
            case 'playbackRate':
                value = this.value * 50;
                break;
        }
        this.style.background = `linear-gradient(to right, 
            #bdae82 0%,
            #bdae82 ${value}%,
            #c8c8c8 ${value}%,
            #c8c8c8 100%)`;
      });
      
     
})

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    bigVideoButton.classList.toggle('video__button_pause');
    togglePlayButton.classList.toggle('pause');
    videoButtonsBlock.classList.toggle('hidden');
}

function handleProgress() {
    const persent = (video.currentTime / video.duration) * 100;
    progress.value = persent;
    progress.style.background = `linear-gradient(to right, 
        #bdae82 0%,
        #bdae82 ${persent}%,
        #c8c8c8 ${persent}%,
        #c8c8c8 100%)`;
    if (persent === 100) {
        togglePlayButton.classList.remove('pause');
        videoButtonsBlock.classList.remove('hidden');
        bigVideoButton.classList.remove('video__button_pause');
    } 
}

function progressUpdate() {
   video.currentTime = (this.value * video.duration) / 100;
}

function timer() {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    currentTime.textContent = `${currentMinutes}:${currentSeconds >= 10 ? currentSeconds : '0' + currentSeconds} `;
    durationTime.textContent = ` ${durationMinutes}:${durationSeconds}`;
}

function toggleVolume() {
    volume.classList.toggle('mute');
    video.volume = volume.classList.contains('mute') ? 0 : volumeRange.value;
}

function playbackRateUpdate() {
    video.playbackRate = this.value;
    speedText.textContent = `x${this.value}`;

}

function volumeUpdate() {
    if (!volume.classList.contains('mute')) video.volume = this.value;
    if ((video.volume === 0) && (!volume.classList.contains('mute'))) toggleVolume();
    if ((this.value > 0) && (volume.classList.contains('mute'))) toggleVolume();
    
}

function resetPlaybackRate() {
    speedRange.value = 1;
    video.playbackRate = 1;
    speedText.textContent = 'x1.0';
    speedRange.style.background = `linear-gradient(to right, 
        #bdae82 0%,
        #bdae82 45%,
        #c8c8c8 45%,
        #c8c8c8 100%)`;
}

function skip() {
    video.currentTime += +this.dataset.skip;
}

function keyEvents(event) {
    if (event.key == ' ') togglePlay();
    if (event.code == 'ArrowLeft') skip.bind(skipButtons[0])();
    if (event.code == 'ArrowRight') skip.bind(skipButtons[1])();
    event.preventDefault();
    

}

bigVideoButton.addEventListener('click', togglePlay);
togglePlayButton.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('input', progressUpdate);

video.addEventListener('timeupdate', timer);
volume.addEventListener('click', toggleVolume);
volumeRange.addEventListener('input', volumeUpdate);
speedRange.addEventListener('input', playbackRateUpdate);
resetSpeed.addEventListener('click', resetPlaybackRate);
skipButtons.forEach(button => button.addEventListener('click', skip));

document.addEventListener('keydown', keyEvents);