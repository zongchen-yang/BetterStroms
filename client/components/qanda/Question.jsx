import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import AddAnswer from './AddAnswer';

const Question = (props) => {
  const {
    question,
    updateQuestionsHelpfulness,
    updateAnswersHelpfulness,
    reportQuestion,
    reportAnswer,
    openAddAnswerModal,
    getQuestionId,
    answerCount,
    // loadMoreAnswers,
  } = props;
  const { question_id, question_body, question_helpfulness, asker_name, answers } = question;
  let [totalAnswerCount, upTotalAnswerCount] = useState(2);
  const [view, setView] = useState('questions');
  let [helpfulCount, setHelpfulCount] = useState(question_helpfulness);
  const [isHelpful, setIsHelpful] = useState(false);
  const [answersList, setAnswersList] = useState({});

  // const loadMoreAnswers = () => {
  //   upTotalAnswerCount(totalAnswerCount += 1);
  // };

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

  const renderView = () => {
    if (view === 'questions') {
      return (
        <div className="question">
          <span className="question-body bold">
            Q: {question_body}
          </span>
          <span
            className="question-flavor-text underline"
            onClick={() => {
              getQuestionId(question_id);
              openAddAnswerModal();
            }}>
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
            onClick={() => updateHelpfulCount()}>
            Yes
          </span>
          <span
            className="question-flavor-text"
          >
            Helpful?
          </span>
          {/* <div>
            by {asker_name}
          </div> */}
          {/* {console.log(answers)} */}
          <div className="answers-list">
            {Object.keys(answersList).map((answerId) => (
              <div key={answersList[answerId].id}>
                <Answer
                  answer={answersList[answerId]}
                  updateAnswersHelpfulness={updateAnswersHelpfulness}
                  reportAnswer={reportAnswer}
                />
              </div>
            )).slice(0, totalAnswerCount)}
            {/* {console.log('total answer ount:', totalAnswerCount)} */}
            {Object.keys(answersList).length > totalAnswerCount
              ? (
                <div
                  className="add-more-answers bold"
                  type="button"
                  onClick={loadMoreAnswers}>
                  Load More Answers
                </div>
              )
              : null
            }
          </div>
          {/* <button type="button" onClick={loadMoreAnswers}>Load More Answers</button> */}
        </div>
      );
    }
  };

  // useEffect(() => {
  //   upTotalAnswerCount(totalAnswerCount += 1);
  // }, [answerCount]);
  useEffect(() => {
    setAnswersList(answers);
  }, [answers]);

  return (
    <div>
      {renderView()}
    </div>
  );
};

export default Question;
