import { useRef, useEffect } from "react";

export default function useQuiz(
  score,
  status,
  audios,
  setStatus,
  setScore,
  time,
  isSound
) {
  const timeRef = useRef(null); // to store the setTimeout reference, so we can clear it when the user clicks on an answer
  const wrongAnswerRef = useRef(null); // to store the wrong answer (int)
  const answer = useRef(0); // the correct answer (int)

  function handleClick(num) {
    // this function will be called when the user clicks on an answer
    setStatus(1); // set the status to "playing"
    if (answer.current === num) {
      // setScore(prev => (prev < 10 ? prev + 1 : prev + 2)); // get 2 points if the question is hard...
      setScore(prev => prev + 1); // if the answer is correct, increase the score only by 1, always
      audios.current.bitGood.play();
    } else {
      wrongAnswerRef.current = num;
      audios.current.bad.play();
      setStatus(2);
    }
  }

  useEffect(() => {
    // this useEffect handles the time interval

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    if (status === 1) {
      // if the user started the game (score: 1+) and the game is still playing, we need to set a new time interval
      timeRef.current = setTimeout(() => {
        audios.current.bad.play();
        setStatus(2);
      }, time.current * 1000 + 200);
    }
  }, [score, status]); // this will run only when score or playing changes (remove timer, and set new one if still playing)

  return {
    handleClick,
    wrongAnswerRef,
    answer,
  };
}
