import { useState, useRef } from "react";
import Quiz from "../components/Quiz";
import Score from "../components/Score";
import Question from "../components/Question";
// import styles from "../styles/Home.module.css";
import useSound from "../hooks/useSound";
import MuteButton from "../components/MuteButton";
import MyHead from "../components/MyHead";
export default function Home() {
  const [score, setScore] = useState(0);
  const answer = useRef(0); // the correct answer (int)
  const [audios, isSound, setSound] = useSound();
  return (
    <>
      <MyHead />
      <Score score={score} />
      <Question setAnswer={e => (answer.current = e)} score={score} />
      <Quiz score={score} setScore={setScore} answer={answer} audios={audios} />
      <MuteButton
        callback={() => {
          isSound.current = !isSound.current;
          if (!isSound.current) {
            // if the sound is muted, pause all sounds before deleting them (otherwise, the sound will continue to play)
            audios.current.click && audios.current.click.pause();
            audios.current.bad && audios.current.bad.pause();
            audios.current.bitGood && audios.current.bitGood.pause();
          }
          setSound();
          isSound.current &&
            audios.current.click &&
            audios.current.click.play();
        }}
      />
    </>
  );
}
