import { useRef, useEffect } from "react";

export default function useSound() {
  const isSound = useRef(true);
  const audios = useRef({
    bitGood: null,
    good: null,
    bad: null,
    click: null,
  });

  let obj = {};

  for (let key in audios.current) {
    obj[key] = {
      play: () => {
        isSound.current && audios.current[key] && audios.current[key].play();
      },
      pause: () => {
        audios.current[key] &&
          audios.current[key] &&
          audios.current[key].pause();
      },
      currentTime: n => {
        audios.current[key] &&
          audios.current[key] &&
          (audios.current[key].currentTime = n);
      },
    };
  }

  const audiosWrapper = useRef(obj);

  function toggleSound() {
    isSound.current = !isSound.current;
    if (!isSound.current) {
      // if the sound got muted, pause all sounds
      audios.current.click && audios.current.click.pause();
      audios.current.bad && audios.current.bad.pause();
      audios.current.bitGood && audios.current.bitGood.pause();

      // also, set the currentTime to 0 so that the audio will start from the beginning next time it's played
      audios.current.click && (audios.current.click.currentTime = 0);
      audios.current.bad && (audios.current.bad.currentTime = 0);
      audios.current.bitGood && (audios.current.bitGood.currentTime = 0);
    } else {
      // if the sound got unmuted, play a click sound
      audios.current.bitGood && audios.current.click.play();
    }
  }

  useEffect(() => {
    // we need this useEffect because we cannot use Audio object on the server.
    // so useEffect will make sure it will run only on the client-side

    audios.current.bitGood = new Audio("/bit-good.ogg");
    audios.current.bad = new Audio("/bad.mp3");
    audios.current.click = new Audio("/click-sound.wav");
  }, []);

  return [audiosWrapper, toggleSound, isSound];
}
