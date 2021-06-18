import React, { useState, useEffect } from 'react';
import Answer from './Answer';

const Question = (props) => {
  const {
    question,
    updateQuestionsHelpfulness,
    updateAnswersHelpfulness,
    reportQuestion,
    reportAnswer,
    openAddAnswerModal,
    getQuestionId,
    theme,
  } = props;
  const { question_id, question_body, question_helpfulness, asker_name, answers } = question;
  let [totalAnswerCount, upTotalAnswerCount] = useState(2);
  let [helpfulCount, setHelpfulCount] = useState(question_helpfulness);
  const [isHelpful, setIsHelpful] = useState(false);
  const [answersList, setAnswersList] = useState({});

  const updateHelpfulCount = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount += 1);
      updateQuestionsHelpfulness(question_id);
    }
  };

  const loadMoreAnswers = () => {
    upTotalAnswerCount(Object.keys(answersList).length);
  };

  const renderView = () => (
    <div className="question">
      <span className="question-body bold">
        Q:&nbsp;
        {question_body}
      </span>
      <span
        className="question-flavor-text underline"
        role="button"
        tabIndex="0"
        onKeyPress={() => {
          getQuestionId(question_id);
          openAddAnswerModal();
        }}
        onClick={() => {
          getQuestionId(question_id);
          openAddAnswerModal();
        }}
      >
        Add Answer
      </span>
      <span className="question-flavor-text">|</span>
      <span className="question-flavor-text">
        &#40;
        {helpfulCount}
        &#41;
      </span>
      <span
        className="helpful-yes question-flavor-text underline"
        role="button"
        tabIndex="0"
        onKeyPress={() => updateHelpfulCount()}
        onClick={() => updateHelpfulCount()}
      >
        Yes
      </span>
      <span
        className="question-flavor-text"
      >
        Helpful?
      </span>
      <div className={theme ? 'answers-list' : 'answers-list dark-list'}>
        {Object.keys(answersList).map((answerId) => (
          <div key={answersList[answerId].id}>
            <Answer
              answer={answersList[answerId]}
              updateAnswersHelpfulness={updateAnswersHelpfulness}
              reportAnswer={reportAnswer}
            />
          </div>
        )).slice(0, totalAnswerCount)}
        {Object.keys(answersList).length > totalAnswerCount
          ? (
            <div
              className="add-more-answers bold"
              role="button"
              tabIndex="0"
              onKeyPress={loadMoreAnswers}
              onClick={loadMoreAnswers}
            >
              Load More Answers
            </div>
          )
          : null}
      </div>
    </div>
  );

  useEffect(() => {
    setAnswersList(answers);
  }, [answers]);

  return (
    <div className="question-container">
      {renderView()}
    </div>
  );
};

export default Question;
