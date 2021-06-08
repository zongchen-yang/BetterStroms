import React, { useState, useEffect } from 'react';
import Answer from './Answer';

const Question = (props) => {
  const {question_id, question_body, question_helpfulness, asker_name, answers} = props.question[0];
  let [totalAnswerCount, upTotalAnswerCount] = useState(2)
  // console.log('props', props.question[0]);
  // console.log('body: ', props.question[0].question_body);

  const loadMoreAnswers = () => {
    upTotalAnswerCount(totalAnswerCount += 1);
    console.log(totalAnswerCount);
  };

  return (
    <div>
      <div>body: {question_body}</div>
      <div>id: {question_id}</div>
      <div>helpful: {question_helpfulness}</div>
      <div>user: {asker_name}</div>
      {console.log(answers)}
      {Object.keys(answers).map((answerId) => (
        <div>
          <Answer answer={answers[answerId]} key={answers[answerId].id} />
        </div>
      )).slice(0, totalAnswerCount)}
      <button onClick={loadMoreAnswers}>Load More Answers</button>
    </div>
  );
};

export default Question;
