import { useEffect } from "react";
import { useCallback } from "react";
import styles from "../styles/Answers.module.css";

export default function Answers({ callback, score, resObj }) {
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
      <button
        onClick={() => callback(1)}
        className={`${resObj.correct === 1 ? styles.correct : ""} ${
          resObj.wrong === 1 ? styles.wrong : ""
        }`}
      >
        <span>1</span>
        <div style={{ animationDuration: `${5}s` }}></div>
      </button>
      <button
        onClick={() => callback(2)}
        className={`${resObj.correct === 2 ? styles.correct : ""} ${
          resObj.wrong === 2 ? styles.wrong : ""
        }`}
      >
        <span>2</span>
        <div style={{ animationDuration: `${5}s` }}></div>
      </button>
      <button
        onClick={() => callback(3)}
        className={`${resObj.correct === 3 ? styles.correct : ""} ${
          resObj.wrong === 3 ? styles.wrong : ""
        }`}
      >
        <span>3</span>
        <div style={{ animationDuration: `${5}s` }}></div>
      </button>
    </div>
  );
}
