import React, { useState, useEffect } from 'react';
import Question from './Question';
import AddAnswer from './AddAnswer';

const QuestionsList = (props) => {
  let [totalQuestionCount, upTotalCount] = useState(2);
  const [view, setView] = useState('questions')
  // const [currentQuestionCount, upCurrentCount] = useState(0);

  const addMoreQuestions = () => {
    upTotalCount(totalQuestionCount += 2);
    // console.log(totalQuestionCount);
  };

  const renderView = () => {
    if (view === 'questions') {
      return (
        <div>
          {props.questions.map((question) => (
            <Question
              question={[question]}
              key={question.question_id}
              updateQuestionsHelpfulness={props.updateQuestionsHelpfulness}
              updateAnswersHelpfulness={props.updateAnswersHelpfulness}
              postNewAnswer={props.postNewAnswer}
            />
          )).slice(0, totalQuestionCount)}
          {console.log(props.postNewAnswer)}
        </div>
      );
    }
  };

  return (
    <div>
      {/* {console.log('this is the questions array: ', props.questions)} */}
      {renderView()}
      {/* <div>
        {props.questions.map((question) => (
          <Question
            question={[question]}
            key={question.question_id}
            updateQuestionsHelpfulness={props.updateQuestionsHelpfulness}
            updateAnswersHelpfulness={props.updateAnswersHelpfulness}
          />
        )).slice(0, totalQuestionCount)}
      </div> */}
      <button type="button" onClick={addMoreQuestions}>More Answered Questions</button>
    </div>
  );
};

export default QuestionsList;
