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
  } = props;
  const {question_id, question_body, question_helpfulness, asker_name, answers} = question;
  let [totalAnswerCount, upTotalAnswerCount] = useState(2);
  const [view, setView] = useState('questions');
  let [helpfulCount, setHelpfulCount] = useState(question_helpfulness);
  const [isHelpful, setIsHelpful] = useState(false);

  const loadMoreAnswers = () => {
    upTotalAnswerCount(totalAnswerCount += 2);
  };

  const updateHelpfulCount = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount += 1);
      updateQuestionsHelpfulness(question_id);
    }
  }

  const renderView = () => {
    if (view === 'questions') {
      return (
        <div className="question">
          <div>
            QUESTION body: {question_body}
          </div>
          <div>
            id: {question_id}
          </div>
          <div onClick={() => updateHelpfulCount()}>
            helpful: {helpfulCount}
          </div>
          <div onClick={() => {
            getQuestionId(question_id);
            openAddAnswerModal();
          }}>
            Add Answer
          </div>
          <div>
            user: {asker_name}
          </div>
          {/* {console.log(answers)} */}
          {Object.keys(answers).map((answerId) => (
            <div key={answers[answerId].id}>
              <Answer
                answer={answers[answerId]}
                updateAnswersHelpfulness={updateAnswersHelpfulness}
                reportAnswer={reportAnswer}
              />
            </div>
          )).slice(0, totalAnswerCount)}
          <button type="button" onClick={loadMoreAnswers}>Load More Answers</button>
          <div onDoubleClick={() => reportQuestion(question_id)}>Report</div>
        </div>
      );
    }
  };

  return (
    <div>
      {renderView()}
    </div>
  );
};

export default Question;
