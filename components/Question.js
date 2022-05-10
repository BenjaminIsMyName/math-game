import { useRef, useLayoutEffect, useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
import { AnimatePresence, motion } from "framer-motion";
export default function Question({ setAnswer, score }) {
  const [nums, setNums] = useState([]);
  const [actions, setActions] = useState([]);
  const nextQuestion = useRef({
    nums: [],
    actions: [],
  });
  function createQuestion() {
    let localNums = [];
    let localActions = [];
    const firstTime =
      nextQuestion.current.nums.length === 0 ||
      nextQuestion.current.actions.length === 0;
    if (firstTime || score === 0) {
      // create the question for the first time
      ({ localNums, localActions } = getQuestionArrays());
    } else {
      // take the question from the ref
      localNums = nextQuestion.current.nums;
      localActions = nextQuestion.current.actions;
    }

    // show the question on the screen
    setActions(localActions);
    setNums(localNums);
    do {
      // if the next question is the same as the one we just generated, we will generate a different next one.
      var next = getQuestionArrays();
    } while (
      getStr(next.localNums, next.localActions) ===
      getStr(localNums, localActions)
    );
    {
      nextQuestion.current = {
        nums: next.localNums,
        actions: next.localActions,
      };
    }
  }

  function getQuestionArrays() {
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

    let isDoubleAllowed = score >= 10;
    let localNums = [createRand(1, 3)];
    let localActions = [];
    if (score >= 5) {
      localNums.push(createRand(1, 3));
      localActions.push(createRand(0, isDoubleAllowed ? 2 : 1));
    }

    let action;
    let res =
      localNums.length == 1
        ? localNums[0]
        : getFullAnswer(localNums, localActions);

    switch (res) {
      case -2:
        localActions.push(0);
        localNums.push(3);
        break;
      case -1:
        localActions.push(0);
        localNums.push(createRand(2, 3));
        break;
      case 0:
        localActions.push(0);
        localNums.push(createRand(1, 3));
        break;
      case 1:
        // let's randomly pick + or * (not -)
        action = isDoubleAllowed && createRand(0, 1) == 1 ? 2 : 0;
        localActions.push(action);
        // based on the sign, we will pick a random number between
        if (action == 0) {
          localNums.push(createRand(1, 2));
        } else {
          localNums.push(1);
        }
        break;
      case 2:
        action = createRand(0, isDoubleAllowed ? 2 : 1);
        localActions.push(action);
        localNums.push(1);
        break;
      case 3:
        action = isDoubleAllowed && createRand(0, 1) === 1 ? 2 : 1; // we use createRand to rolld a dice (1=true, 0=false)
        localActions.push(action);
        localNums.push(action === 1 ? createRand(1, 2) : 1); // minus? 1-2. double? 1
        break;
      case 4:
        localActions.push(1);
        localNums.push(createRand(1, 3));
        break;
      case 5:
        localActions.push(1);
        localNums.push(createRand(2, 3));
        break;
      case 6:
        localActions.push(1);
        localNums.push(3);
        break;
      default: // if 3*3, just pick a different random question
        return getQuestionArrays();
    }
    return { localNums, localActions };
  }

  function createRand(min, max) {
    // this function will create a random number between min and max. min and max are inclusive.
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calcPart(n, action, y) {
    // calculate the answer
    switch (action) {
      case 0:
        return n + y;
      case 1:
        return n - y;
      case 2:
        return n * y;
      default:
        return -1;
    }
  }

  function getFullAnswer(n, act) {
    // PROBLEM:
    // if * is the second (2-1*3), there is a problem.
    // we will calculate the first part, and then we will calculate the second part. but * is more important!
    // only when the sum of the first two digit is between 1 and 3, we could have a problem. (only then we add multiplication)
    // but if the sum is 2, we will not have a problem. because then it can only be muilplication of 1. so: 3-1*1 or 1+1*1 is always 2.
    // if the sum is 3, we will not have a problem. because then it can only be multiplication of 1. so: 1+2*1 or 2+1*1 is always 3.
    // so only if the sum is 1, we could have different multiplication (1-3), so only then we could have a problem.
    // list of possible problematic cases:
    // 2-1*3 (our calculation is (2-1)*3=3, but the real calculation is 2-(1*3)=-1
    // 3-2*3 (our calculation is (3-2)*3=3, but the real calculation is 3-(2*3)=-3
    // 2-1*2 (our calculation is (2-1)*2=2, but the real calculation is 2-(1*2)=0
    // 3-2*2 (our calculation is (3-2)*2=2, but the real calculation is 3-(2*2)=-1
    // 2-1*1 (our calculation is (2-1)*1=1, but the real calculation is 2-(1*1)=1 (no problem)
    // 3-2*1 (our calculation is (3-2)*1=1, but the real calculation is 3-(2*1)=1 (no problem)

    // SOLUTION:
    // we will allow only *1 when the sum is 1.
    // so the multiplication will be 1 in the second part.

    // ANOHTER PROBLEM:
    // if we have 1+1*3, we will calculate 1+1, go to the "case 2" and won't allow to pick *3.
    // SOLUTION:
    // ummm...

    // ANOHTER PROBLEM:
    // what happens if we get 3*3? we don't have a way to take down the answer to 3.
    // SOLUTION:
    // we won't allow 3*3.

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
    // when a new question is created, let the parent component know what is the correct answer
    if (nums.length > 0 && actions.length > 0) {
      setAnswer(getFullAnswer());
    }
  }, [nums, actions]); // missing dependencies warning: getFullAnswer, getStr, setAnswer

  useEffect(() => {
    // when the score changes (answered a question or just started the game), create a new question
    createQuestion(); // missing dependencies warning: createQuestion
  }, [score]);

  function getStr(n, act) {
    n = n || nums;
    act = act || actions;
    let question = "";
    if (n.length > 0 && act.length > 0) {
      let i = 0;
      for (; i < act.length; i++) {
        question += n[i] + " " + getActionSign(act[i]) + " ";
      }
      question = question + n[i];
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
