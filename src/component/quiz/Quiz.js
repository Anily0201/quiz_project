// {(yesma timer zero vaye paxi atomaticaly next vayera next question ma jani code xh )}

import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data } from '../../assets/Data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [Question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timer, setTimer] = useState(5);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let Option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0 && !lock) {
        setTimer((prev) => prev - 1);
      } else if (timer === 0) {
        handleTimeout();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, lock]);

  const handleTimeout = () => {
    setLock(true);
    
    Next();
  };

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (Question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        Option_array[Question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const Next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      setTimer(30); 
      Option_array.forEach((Option) => {
        Option.current.classList.remove("wrong");
        Option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimer(30);
  };

  return (
    <div className='container'>
      <h1>Quiz Application</h1>
      <hr />
      {result ? (
        <>
          <h2>You Score {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}.{Question.Question}
          </h2>
          <div className="timer">Time left: {timer} seconds</div>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {Question.Option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {Question.Option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {Question.Option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {Question.Option4}
            </li>
          </ul>
          <button onClick={Next}>Next</button>
          <div className='index'>
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;














// {( yesma timer with tik-tik sound wala code xh)}

// import React, { useRef, useState, useEffect } from 'react';
// import './Quiz.css';
// import { data } from '../../assets/Data';

// const tickingSound = new Audio('/ticking-sound.mp3'); 

// const Quiz = () => {
//   const [index, setIndex] = useState(0);
//   const [Question, setQuestion] = useState(data[index]);
//   const [lock, setLock] = useState(false);
//   const [score, setScore] = useState(0);
//   const [result, setResult] = useState(false);
//   const [timer, setTimer] = useState(30);

//   let Option1 = useRef(null);
//   let Option2 = useRef(null);
//   let Option3 = useRef(null);
//   let Option4 = useRef(null);

//   let Option_array = [Option1, Option2, Option3, Option4];

//   useEffect(() => {
//     const timerInterval = setInterval(() => {
//       if (timer > 0 && !lock) {
//         setTimer((prev) => prev - 1);
//         tickingSound.play(); 
//       } else if (timer === 0) {
//         handleTimeout();
//       }
//     }, 1000);

//     return () => {
//       clearInterval(timerInterval);
//       tickingSound.pause();
//       tickingSound.currentTime = 0; 
//     };
//   }, [timer, lock]);

//   const handleTimeout = () => {
//     setLock(true);
//     tickingSound.pause(); 
//   };

//   const checkAns = (e, ans) => {
//     if (lock === false) {
//       if (Question.ans === ans) {
//         e.target.classList.add("correct");
//         setLock(true);
//         setScore((prev) => prev + 1);
//       } else {
//         e.target.classList.add("wrong");
//         setLock(true);
//         Option_array[Question.ans - 1].current.classList.add("correct");
//       }
//       tickingSound.pause(); 
//     }
//   };

//   const Next = () => {
//     if (lock === true) {
//       if (index === data.length - 1) {
//         setResult(true);
//         return 0;
//       }
//       setIndex((prevIndex) => prevIndex + 1);
//       setQuestion(data[index + 1]);
//       setLock(false);
//       setTimer(30); 
//       tickingSound.currentTime = 0; 
//       Option_array.forEach((Option) => {
//         Option.current.classList.remove("wrong");
//         Option.current.classList.remove("correct");
//       });
//     }
//   };

//   const reset = () => {
//     setIndex(0);
//     setQuestion(data[0]);
//     setScore(0);
//     setLock(false);
//     setResult(false);
//     setTimer(30);
//   };

//   return (
//     <div className='container'>
//       <h1>Quiz Application</h1>
//       <hr />
//       {result ? (
//         <>
//           <h2>You Score {score} out of {data.length}</h2>
//           <button onClick={reset}>Reset</button>
//         </>
//       ) : (
//         <>
//           <h2>
//             {index + 1}.{Question.Question}
//           </h2>
//           <div className="timer">Time left: {timer} seconds</div>
//           <ul>
//             <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
//               {Question.Option1}
//             </li>
//             <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
//               {Question.Option2}
//             </li>
//             <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
//               {Question.Option3}
//             </li>
//             <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
//               {Question.Option4}
//             </li>
//           </ul>
//           <button onClick={Next}>Next</button>
//           <div className='index'>
//             {index + 1} of {data.length} Questions
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Quiz;




