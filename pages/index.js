import Head from "next/head";
import { useState, useRef } from "react";
import Quiz from "../components/Quiz";
import Score from "../components/Score";
import Question from "../components/Question";

// import styles from "../styles/Home.module.css";

export default function Home() {
  const [score, setScore] = useState(0);
  const answer = useRef(0); // the correct answer (int)
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
      <Score score={score} />
      <Question setAnswer={e => (answer.current = e)} score={score} />
      <Quiz score={score} setScore={setScore} answer={answer} />
    </>
  );
}
