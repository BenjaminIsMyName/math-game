import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Answers from "../components/Answers";
import GameOver from "../components/Gameover";
import Question from "../components/Question";
import styles from "../styles/Home.module.css";

export default function Home() {
  const audios = useRef({
    bitGood: null,
    good: null,
    bad: null,
  });
  const answer = useRef(0);
  const question = useRef("");
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timeRef = useRef(null);
  const reasonRef = useRef(null);
  const wrongAnswerRef = useRef(null);

  useEffect(() => {
    // only call client-side, not server-side
    audios.current.bitGood = new Audio("/bit-good-sound.mp3");
    audios.current.bad = new Audio("/bad.mp3");
  }, []);

  function handleClick(num) {
    if (answer.current === num) {
      setScore(prev => (prev < 10 ? prev + 1 : prev + 2));
      audios.current.bitGood && audios.current.bitGood.play();
    } else {
      wrongAnswerRef.current = num;
      reasonRef.current = `No, ${question.current} = ${answer.current} and not ${num}`;
      audios.current.bad && audios.current.bad.play();
      setPlaying(false);
    }
  }

  useEffect(() => {
    // set Playing to false if time is up (10 seconds are over since the answer is displayed)

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    if (score >= 1 && playing) {
      timeRef.current = setTimeout(() => {
        reasonRef.current = `You ran out of time! The last question was ${question.current} = ${answer.current}`;
        audios.current.bad && audios.current.bad.play();
        setPlaying(false);
      }, 5200);
    }
  }, [score, playing]);

  return (
    <>
      <Head>
        <title>Benjamin&apos;s Game</title>
        <meta name='description' content='Generated by create next app' />
        {/* disable pinch to zoom: */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
      </Head>
      <div className={styles.score}>SCORE: {score}</div>
      <Question
        setAnswer={e => (answer.current = e)}
        score={score}
        setQuestion={val => (question.current = val)}
      />
      <Answers
        callback={wrongAnswerRef.current ? n => null : handleClick}
        score={wrongAnswerRef.current ? -1 : score}
        resObj={{
          correct: wrongAnswerRef.current ? answer.current : null,
          wrong: wrongAnswerRef.current ? wrongAnswerRef.current : null,
        }}
      />
      {playing || (
        <GameOver
          score={score}
          reason={reasonRef.current}
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
