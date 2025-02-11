document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play-button');
  const pauseButton = document.getElementById('pause-button');
  const radioPlayer = document.getElementById('radio-player');

  playButton.addEventListener('click', () => {
    radioPlayer.play();
  });

  pauseButton.addEventListener('click', () => {
    radioPlayer.pause();
  });
});