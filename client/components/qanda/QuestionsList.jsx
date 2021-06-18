import React, { useState, useEffect } from 'react';
import Question from './Question';
import AddAnswer from './AddAnswer';
import ClickTracking from '../../WithClickTrackingEventHandler';

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
  const [view, setView] = useState('questions');
  let [answerCount, setAnswerCount] = useState(2);
  const [questionsList, setQuestionsList] = useState([]);

  const addMoreQuestions = () => {
    upTotalCount(totalQuestionCount += 2);
  };

  // console.log(questions)

  const renderQuestions = () => (
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
            answerCount={answerCount}
            theme={theme}
          />
        </div>
      )).slice(0, totalQuestionCount)}
    </div>
  );

  useEffect(() => {
    setQuestionsList([...questions]);
  }, [questions]);

  return (
    <div>
      {renderQuestions()}
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
          <ClickTracking element="Add A Question Button" module="QandA">
            <button
              className="button-questions"
              type="button"
              onClick={openAddQuestionModal}
            >
              ADD A QUESTION +
            </button>
          </ClickTracking>
        </span>
      </div>
    </div>
  );
};

export default QuestionsList;
