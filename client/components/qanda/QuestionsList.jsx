import React, { useState, useEffect } from 'react';
import Question from './Question';

const QuestionsList = (props) => {
  const {
    questions,
    updateQuestionsHelpfulness,
    updateAnswersHelpfulness,
    reportQuestion,
    reportAnswer,
    openAddAnswerModal,
    openAddQuestionModal,
    getQuestionId,
    theme,
  } = props;
  let [totalQuestionCount, upTotalCount] = useState(4);
  const [questionsList, setQuestionsList] = useState([]);

  const addMoreQuestions = () => {
    upTotalCount(totalQuestionCount += 2);
  };

  const renderQuestions = () => (
    <div>
      <div className={theme ? 'questions-list' : 'questions-list dark-list'}>
        {questionsList.map((question) => (
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
              theme={theme}
            />
          </div>
        )).slice(0, totalQuestionCount)}
      </div>
      <div>
        <span>
          <button
            className="button-questions"
            type="button"
            onClick={addMoreQuestions}
          >
            MORE ANSWERED QUESTIONS
          </button>
        </span>
        <span>
          <button
            className="button-questions"
            type="button"
            onClick={openAddQuestionModal}
          >
            ADD A QUESTION +
          </button>
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    setQuestionsList([...questions]);
  }, [questions]);

  return (
    <div>
      {renderQuestions()}
    </div>
  );
};

export default QuestionsList;
