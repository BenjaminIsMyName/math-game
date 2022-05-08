import styles from "../styles/Answers.module.css";

export default function Answers({ callback, score, resObj }) {
  return (
    <div
      key={score} // when score changes, the element will unmount and mount again (react will think it's a new element)
      className={`${styles.answers} ${score >= 1 ? styles.animate : ""}`}
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
