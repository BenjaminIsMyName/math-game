import styles from "../styles/GameOver.module.css";
// import Button from "@mui/material/Button";
export default function GameOver({ playAgain }) {
  return (
    <div className={styles.container}>
      <button onClick={playAgain}>Play again</button>
      {/* <Button onClick={playAgain} variant='contained'>
        Hello World
      </Button> */}
    </div>
  );
}
