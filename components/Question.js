import { useRef, useLayoutEffect, useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
import { AnimatePresence, motion } from "framer-motion";
export default function Question({ setAnswer, score }) {
  const [nums, setNums] = useState([]);
  const [actions, setActions] = useState([]); // TODO: save in 'actions' only the action's number (0 or 1) and the action's sign (+ or -)

  function createQuestion() {
    // to prevent questions like 2+2 (we don't have "4" in our answers buttons) we need to do the following:
    // 1. as long as the questions are not longer than 3 numbers (as in: 2+2-3) we can randomly choose the number(s) and sign (+/-).
    // 2. but the last number, and the last sign, will be picked by us in this functiom.
    // 3. we will check the sum of the question that was randomly genereted, and then we will manually add the last number and the last sign.
    // 4. for example:
    //    if we currently only need questions with 2 numbers, we will randomly pick one number.
    //    let's say we picked 2.
    //    so we'll enter the try-catch block.
    //    in there, in "case 2", we will randomly pick one sign.
    //    but the number will not be randomly picked. it will be 1. (because 2+1=3 or 2-1=1, but 2+2=4 or 2-2=0 etc)))
    //
    //    another example:
    //    if we currently need questions with 3 numbers, we will randomly pick two numbers and one sign.
    //    let's say we picked 2+3.
    //    so we'll calculate the sum of it and enter the try-catch block.
    //    in there, in "case 5", we will manually set the sign to minus (we have to make the 5 be lower), and we will pick a random number between 2-3 (because 5-1 is not small enough).

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
    // when a new question is created, let the parent component know what what is the correct answer
    if (nums.length > 0 && actions.length > 0) {
      setAnswer(getFullAnswer());
    }
  }, [nums, actions]); // missing dependencies warning: getFullAnswer, getStr, setAnswer

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

  return (
    <div className={styles.container}>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.h1
          key={score}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          className={styles.question}
        >
          {getStr() || "..."}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
