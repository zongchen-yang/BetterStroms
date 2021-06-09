import React, { useState, useEffect } from 'react';
import Question from './Question';
import AddAnswer from './AddAnswer';

const QuestionsList = (props) => {
  const {
    questions,
    updateQuestionsHelpfulness,
    updateAnswersHelpfulness,
    postNewAnswer,
    reportQuestion,
    reportAnswer,
    openAddAnswerModal,
    closeAddAnswerModal,
    openAddQuestionModal,
    closeAddQuestionModal,
    showAddAnswerModal,
    getQuestionId,
  } = props;
  let [totalQuestionCount, upTotalCount] = useState(2);
  const [view, setView] = useState('questions');
  // const [currentQuestionCount, upCurrentCount] = useState(0);

  const addMoreQuestions = () => {
    upTotalCount(totalQuestionCount += 2);
    // console.log(totalQuestionCount);
  };

  const renderView = () => (
    <div>
      {questions.map((question) => (
        <div key={question.question_id}>
          <Question
            question={question}
            key={question.question_id}
            updateQuestionsHelpfulness={updateQuestionsHelpfulness}
            updateAnswersHelpfulness={updateAnswersHelpfulness}
            reportQuestion={reportQuestion}
            reportAnswer={reportAnswer}
            openAddAnswerModal={openAddAnswerModal}
            getQuestionId={getQuestionId}
          />
        </div>
      )).slice(0, totalQuestionCount)}
    </div>
  );

  return (
    <div>
      {renderView()}
      <button type="button" onClick={addMoreQuestions}>More Answered Questions</button>
      <button type="button" onClick={openAddQuestionModal}>Add a Question +</button>
    </div>
  );
};

export default QuestionsList;
