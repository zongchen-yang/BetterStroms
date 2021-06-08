import React, { useState, useEffect } from 'react';
import Question from './Question';

const QuestionsList = (props) => {
  let [totalQuestionCount, upTotalCount] = useState(2);
  // const [currentQuestionCount, upCurrentCount] = useState(0);

  const addMoreQuestions = () => {
    upTotalCount(totalQuestionCount += 1);
    console.log(totalQuestionCount);
  };

  return (
    <div>
      {/* {console.log('this is the questions array: ', props.questions)} */}
      <div>
        {props.questions.map((question) => (
          <Question question={[question]} key={question.question_id} />
        )).slice(0, totalQuestionCount)}
      </div>
      <button type="button" onClick={addMoreQuestions}>Add More Questions</button>
    </div>
  );
};

export default QuestionsList;
