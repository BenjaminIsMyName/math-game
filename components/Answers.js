import { useEffect } from "react";
import { useCallback } from "react";
import styles from "../styles/Answers.module.css";
import AnswerButton from "./AnswerButton";

export default function Answers({ callback, score, resObj, time }) {
  const handleKeyDown = useCallback(
    // memoize the callback
    event => {
      let num;
      try {
        num = parseInt(event.key);
      } catch (e) {
        return;
      }
      if (num > 0 && num <= 3) {
        callback(num);
      }
    },
    [callback]
  );

  useEffect(() => {
    // add event listener to the window:
    window.addEventListener("keydown", handleKeyDown);
    // remove event listener on unmount:
    // from the docs:
    // "React performs the cleanup when the component unmounts.
    //  However, as we learned earlier, effects run for every render and not just once.
    //  This is why React also cleans up effects from the previous render before running the effects next time."
    // in other words, theis cleanup function will be called before react will run this useEffect again
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      key={score} // when score changes, the element will unmount and mount again (react will think it's a new element)
      className={`${styles.answers} ${score >= 1 ? styles.animate : ""}`} // when score is less than one, the answers are not animated (simple background)
    >
      <AnswerButton n={1} callback={callback} resObj={resObj} time={time} />
      <AnswerButton n={2} callback={callback} resObj={resObj} time={time} />
      <AnswerButton n={3} callback={callback} resObj={resObj} time={time} />
    </div>
  );
}
