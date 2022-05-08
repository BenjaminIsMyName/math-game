import { useRef, useLayoutEffect, useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
export default function Question({ setAnswer, score, setQuestion }) {
  const [nums, setNums] = useState([]);
  const [actions, setActions] = useState([]); // TODO: save in 'actions' only the action's number (0 or 1) and the action's sign (+ or -)

  function createQuestion() {
    let random = [createRand(1, 3)];
    let signs = [];
    if (score >= 10) {
      random.push(createRand(1, 3));
      signs.push(getActionSign(createRand(0, 1)));
    }

    let res = random.length == 1 ? random[0] : getFullAnswer(random, signs);
    switch (res) {
      case -2:
        setActions([...signs, getActionSign(0)]);
        setNums([...random, 3]);
        break;
      case -1:
        setActions([...signs, getActionSign(0)]);
        setNums([...random, createRand(2, 3)]);
        break;
      case 0:
        setActions([...signs, getActionSign(0)]);
        setNums([...random, createRand(1, 3)]);
        break;
      case 1:
        setActions([...signs, getActionSign(0)]);
        setNums([...random, createRand(1, 2)]);
        break;
      case 2:
        setActions([...signs, getActionSign(createRand(0, 1))]);
        setNums([...random, 1]);
        break;
      case 3:
        setActions([...signs, getActionSign(1)]);
        setNums([...random, createRand(1, 2)]);
        break;
      case 4:
        setActions([...signs, getActionSign(1)]);
        setNums([...random, createRand(1, 3)]);
        break;
      case 5:
        setActions([...signs, getActionSign(1)]);
        setNums([...random, createRand(2, 3)]);
        break;
      case 6:
        setActions([...signs, getActionSign(1)]);
        setNums([...random, 3]);
      default:
        break;
    }
  }

  function createRand(min, max) {
    // this function will create a random number between min and max. min and max are inclusive.
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calcPart(n, action, y) {
    // calculate the answer
    switch (action) {
      case "+":
        return n + y;
      case "-":
        return n - y;
      default:
        return -1;
    }
  }

  function getFullAnswer(n, act) {
    n = n || nums;
    act = act || actions;
    let res = n[0];
    for (let i = 0; i < act.length; i++) {
      res = calcPart(res, act[i], n[i + 1]);
    }
    return res;
  }

  function getActionSign(n) {
    switch (n) {
      case 0:
        return "+";
      case 1:
        return "-";
      case 2:
        return "*";
      default:
        return "";
    }
  }

  useEffect(() => {
    // when the component is mounted (first time ever), create a new question
    createQuestion();
  }, []); // missing dependencies warning: createQuestion

  useEffect(() => {
    // when a new question is created, let the parent component know what is the question and what is the answer
    if (nums.length > 0 && actions.length > 0) {
      setAnswer(getFullAnswer());
      setQuestion(getStr());
    }
  }, [nums, actions]); // missing dependencies warning: getFullAnswer, getStr, setAnswer, setQuestion

  useEffect(() => {
    // when the score changes (next step), create a new question
    createQuestion(); // missing dependencies warning: createQuestion
  }, [score]);

  function getStr() {
    let question = "";
    if (nums.length > 0 && actions.length > 0) {
      let i = 0;
      for (; i < actions.length; i++) {
        question += nums[i] + " " + actions[i] + " ";
      }
      question = question + nums[i];
    }
    return question;
  }

  return <h1 className={styles.question}>{getStr() || "..."}</h1>;
}
