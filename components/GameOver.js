import styles from "../styles/GameOver.module.css";
export default function GameOver({ playAgain }) {
  return (
    <div className={styles.container}>
      <button onClick={playAgain}>Play again</button>
    </div>
  );
}
