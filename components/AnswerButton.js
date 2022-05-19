import styles from "../styles/AnswerButton.module.css";

export default function AnswerButton({ n, callback, resObj, time }) {
  return (
    <button
      onClick={() => callback(n)}
      className={`${styles.button} ${
        resObj.correct === n ? styles.correct : ""
      } ${resObj.wrong === n ? styles.wrong : ""}`}
    >
      <span>{n}</span>
      <div style={{ animationDuration: `${time.current}s` }}></div>
    </button>
  );
}
