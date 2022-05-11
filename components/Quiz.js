import Answers from "./Answers";
import GameOver from "./GameOver";
import { useState, useEffect, useRef } from "react";
export default function Quiz({ score, setScore, answer, audios }) {
  // this component exists to make sure that
  // when the "playing" state changes - it will cause
  // only effected components ("Answers" and "GameOver") to re-render

  const [playing, setPlaying] = useState(true); // true = playing, false = game over
  const timeRef = useRef(null); // to store the time interval
  const wrongAnswerRef = useRef(null); // to store the wrong answer (int)

  function handleClick(num) {
    // this function will be called when the user clicks on an answer
    if (answer.current === num) {
      // setScore(prev => (prev < 10 ? prev + 1 : prev + 2)); // get 2 points if the question is hard...
      setScore(prev => prev + 1); // if the answer is correct, increase the score only by 1
      audios.current.bitGood && audios.current.bitGood.play();
    } else {
      wrongAnswerRef.current = num;
      audios.current.bad && audios.current.bad.play();
      setPlaying(false);
    }
  }

  useEffect(() => {
    // this useEffect handles the time interval

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    if (score >= 1 && playing) {
      // if the user started the game (score: 1+) and the game is still playing, we need to set a new time interval
      timeRef.current = setTimeout(() => {
        audios.current.bad && audios.current.bad.play();
        setPlaying(false);
      }, 5200);
    }
  }, [score, playing]); // this will run only when score or playing changes (remove timer, and set new one if still playing)

  return (
    <>
      <Answers
        callback={playing ? handleClick : () => null} // if playing is false, we don't want to do anything when the user clicks on an answer
        score={wrongAnswerRef.current ? -1 : score} // only if the user chose the wrong answer, re-mount the answers with score of -1 (which means: no animation, simple background). but if the user lost because of time, we don't want to re-mount the answers (stay red). score (the key) will not update.
        resObj={{
          correct: wrongAnswerRef.current ? answer.current : null,
          wrong: wrongAnswerRef.current ? wrongAnswerRef.current : null,
        }}
      />
      {playing || (
        <GameOver
          playAgain={() => {
            setPlaying(true);
            setScore(0);
            audios.current.bad && audios.current.bad.pause();
            if (audios.current.bad) {
              audios.current.bad.currentTime = 0; // reset the audio
            }
            wrongAnswerRef.current = null;
          }}
        />
      )}
    </>
  );
}
