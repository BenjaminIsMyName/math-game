import { useState, useRef } from "react";
import Quiz from "../components/Quiz";
import Score from "../components/Score";
import Question from "../components/Question";
// import styles from "../styles/Home.module.css";
import useSound from "../hooks/useSound";
import MyHead from "../components/MyHead";
import Fabs from "../components/Fabs";

export default function Home() {
  // TODO:
  // 1. add transition to TimeButton rmoval
  // 2. fix Firefox bug
  // 3. fix audio re-fetching

  const [score, setScore] = useState(0);
  const answer = useRef(0); // the correct answer (int)
  const [audios, isSound, setSound, handleMute] = useSound();
  const [time, setTime] = useState(5); // TODO: change this to useRef
  const [status, setStatus] = useState(0); // 0: game didn't start yet, 1: playing, 2: game is over

  return (
    <>
      <MyHead />
      <Score score={score} />
      <Question setAnswer={e => (answer.current = e)} score={score} />
      <Quiz
        score={score}
        setScore={setScore}
        answer={answer}
        audios={audios}
        time={time}
        status={status}
        setStatus={setStatus}
      />
      <Fabs
        muteCallback={handleMute}
        time={time}
        setTime={setTime}
        status={status}
      />
    </>
  );
}
