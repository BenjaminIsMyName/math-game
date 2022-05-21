import { useState, useRef } from "react";
import Score from "../components/Score";
import Question from "../components/Question";
// import styles from "../styles/Home.module.css";
import useSound from "../hooks/useSound";
import MyHead from "../components/MyHead";
import Fabs from "../components/Fabs";
import Answers from "../components/Answers";
import GameOver from "../components/GameOver";
import useQuiz from "../hooks/useQuiz";

export default function Home() {
  // TODO:
  // 1. fix Firefox bug - SVGs are hidden behind the address bar

  const [score, setScore] = useState(0);
  const [audios, toggleSound, isSound] = useSound(); // all the audio logic
  const timeLimit = useRef(5); // time limit (int)
  const [status, setStatus] = useState(0); // 0: game didn't start yet, 1: playing, 2: game is over
  const { handleClick, wrongAnswerRef, answer } = useQuiz(
    score,
    status,
    audios,
    setStatus,
    setScore,
    timeLimit,
    isSound
  ); // the logic for the quiz

  return (
    <>
      <MyHead />
      <Score score={score} />
      <Question setAnswer={e => (answer.current = e)} score={score} />
      <Answers
        time={timeLimit}
        callback={status !== 2 ? handleClick : () => null} // if playing is false, we don't want to do anything when the user clicks on an answer
        score={wrongAnswerRef.current ? -1 : score} // only if the user chose the wrong answer, re-mount the answers with score of -1 (which means: no animation, simple background). but if the user lost because of time, we don't want to re-mount the answers (stay red). score (the key) will not update.
        resObj={{
          correct: wrongAnswerRef.current ? answer.current : null,
          wrong: wrongAnswerRef.current ? wrongAnswerRef.current : null,
        }}
      />
      {status === 2 && (
        <GameOver
          playAgain={() => {
            setStatus(0);
            setScore(0);
            isSound.current && audios.current.bad && audios.current.bad.pause();
            if (isSound.current && audios.current.bad) {
              audios.current.bad.currentTime = 0; // reset the audio
            }
            wrongAnswerRef.current = null;
          }}
        />
      )}
      <Fabs
        muteCallback={toggleSound}
        time={timeLimit}
        setTime={e => (timeLimit.current = e)}
        status={status}
      />
    </>
  );
}
