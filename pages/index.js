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
import PlayAgainSnackbar from "../components/PlayAgainSnackbar";

export default function Home() {
  // TODO:
  // 1. fix Firefox bug - SVGs are hidden behind the address bar
  // 2. add "settings" fab to open mute/time buttons - DONE.
  // 3. add "account/user" SpeedDial, to allow login/logout/signup/delete account/change theme (using mongoDB)
  // 4. add a small alert to show the user that the game is over, when trying to click on a question when the game is over
  // 5. add a live list of the top players (using websockets or something)
  // 6. animate linear background color change when score changes

  const [score, setScore] = useState(0);
  const [audios, toggleSound, isSound] = useSound(); // all the audio logic
  const timeLimit = useRef(5); // time limit (int)
  const [status, setStatus] = useState(0); // 0: game didn't start yet, 1: playing, 2: game is over
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { handleClick, wrongAnswerRef, answer } = useQuiz(
    score,
    status,
    audios,
    setStatus,
    setScore,
    timeLimit,
    isSound
  ); // the logic for the quiz

  function handleCloseOfSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  }

  function playAgain() {
    setStatus(0);
    setScore(0);
    audios.current.bad.pause();
    audios.current.bad.currentTime(0); // reset the audio
    wrongAnswerRef.current = null;
    handleCloseOfSnackbar();
  }

  return (
    <>
      <MyHead />
      <Score score={score} />
      <Question setAnswer={e => (answer.current = e)} score={score} />
      <Answers
        time={timeLimit}
        callback={status === 2 ? () => setIsSnackbarOpen(true) : handleClick} // if playing is false, we don't want to do anything when the user clicks on an answer
        score={wrongAnswerRef.current ? -1 : score} // only if the user chose the wrong answer, re-mount the answers with score of -1 (which means: no animation, simple background). but if the user lost because of time, we don't want to re-mount the answers (stay red). score (the key) will not update.
        resObj={{
          correct: wrongAnswerRef.current ? answer.current : null,
          wrong: wrongAnswerRef.current ? wrongAnswerRef.current : null,
        }}
      />
      {status === 2 && <GameOver playAgain={playAgain} />}
      <Fabs
        muteCallback={toggleSound}
        time={timeLimit}
        setTime={e => (timeLimit.current = e)}
        status={status}
        isSound={isSound}
      />
      <PlayAgainSnackbar
        isSnackbarOpen={isSnackbarOpen}
        playAgain={playAgain}
        handleCloseOfSnackbar={handleCloseOfSnackbar}
      />
    </>
  );
}
