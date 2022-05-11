import styles from "../styles/GameOver.module.css";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
export default function GameOver({ playAgain }) {
  return (
    <div className={styles.container}>
      <Button onClick={playAgain} variant='outlined' startIcon={<ReplayIcon />}>
        Play Again
      </Button>
    </div>
  );
}
