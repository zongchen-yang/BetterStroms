import React from 'react';
import Question from './Question';

const QuestionsList = (props) => (
  <div>
    {props.questions.map((question) => (
      <Question question={[question]} key={question.question_id} />
    ))}
  </div>
);

export default QuestionsList;
