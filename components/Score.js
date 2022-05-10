import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/Score.module.css";
export default function Score({ score }) {
  return (
    <AnimatePresence exitBeforeEnter={true}>
      <div className={styles.score} key='score'>
        SCORE:{" "}
        <motion.span
          initial={{ y: -15, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 15, opacity: 0.5 }}
          key={score}
        >
          {score}
        </motion.span>
      </div>
    </AnimatePresence>
  );
}
