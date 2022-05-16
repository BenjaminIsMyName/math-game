import { useRef, useEffect } from "react";

export default function useSound() {
  const isSound = useRef(true);
  const audios = useRef({
    bitGood: null,
    good: null,
    bad: null,
    click: null,
  });

  function setSound() {
    if (isSound.current) {
      audios.current.bitGood = new Audio("/bit-good-sound.mp3");
      audios.current.bad = new Audio("/bad.mp3");
      audios.current.click = new Audio("/bit-good-sound.mp3");
    } else {
      audios.current.bitGood = null;
      audios.current.bad = null;
      audios.current.click = null;
    }
  }

  function handleMute() {
    isSound.current = !isSound.current;
    if (!isSound.current) {
      // if the sound is muted, pause all sounds before deleting them (otherwise, the sound will continue to play)
      audios.current.click && audios.current.click.pause();
      audios.current.bad && audios.current.bad.pause();
      audios.current.bitGood && audios.current.bitGood.pause();
    }
    setSound();
    isSound.current && audios.current.click && audios.current.click.play();
  }

  useEffect(() => {
    // we need this useEffect because we cannot use Audio object on the server.
    // so useEffect will make sure it will run only on the client-side
    setSound();
  }, []);

  return [audios, isSound, setSound, handleMute];
}
