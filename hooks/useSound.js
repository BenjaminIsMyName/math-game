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

  useEffect(() => {
    // we need this useEffect because we cannot use Audio object on the server.
    // so useEffect will make sure it will run only on the client-side
    setSound();
  }, []);

  return [audios, isSound, setSound];
}
