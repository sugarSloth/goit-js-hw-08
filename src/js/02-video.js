import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const vimeoPlayer = new Player(iframe);

const VIDEO_PLAYER_CURRENT_TIME_KEY = 'videoplayer-current-time';

const handleTimeUpdate = event => {
  try {
    localStorage.setItem(VIDEO_PLAYER_CURRENT_TIME_KEY, JSON.stringify(event?.seconds));
  } catch (error) {
    console.error('Error while updating video player current time:', error);
  }
};

vimeoPlayer.on('timeupdate', throttle(handleTimeUpdate, 1000));

try {
  const savedTime = JSON.parse(localStorage.getItem(VIDEO_PLAYER_CURRENT_TIME_KEY));
  if (savedTime) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
} catch (error) {
  console.error('Error while setting video player current time:', error);
}
