import styles from "../styles/GameOver.module.css";
export default function GameOver({ playAgain, score, reason }) {
  return (
    <div className={styles.container}>
      {/* <h1>Game Over!</h1> */}
      {/* <h2>SCORE: {score}</h2> */}
      <button onClick={playAgain}>Play again</button>
      {/* <h3>{reason}</h3> */}
    </div>
  );
}
