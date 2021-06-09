import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import AddAnswer from './AddAnswer';

const Question = (props) => {
  const {question_id, question_body, question_helpfulness, asker_name, answers} = props.question;
  let [totalAnswerCount, upTotalAnswerCount] = useState(2);
  const [view, setView] = useState('questions');
  let [helpfulCount, setHelpfulCount] = useState(question_helpfulness);
  const [isHelpful, setIsHelpful] = useState(false);

  const loadMoreAnswers = () => {
    upTotalAnswerCount(totalAnswerCount += 2);
  };

  const updateViewAddAnswer = () => {
    setView('addAnswer');
  };

  const updateHelpfulCount = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount += 1);
      props.updateQuestionsHelpfulness(question_id)
    }
  }

  const renderView = () => {
    if (view === 'questions') {
      return (
        <div>
          <div>QUESTION body: {question_body}</div>
          <div>id: {question_id}</div>
          <div onClick={() => updateHelpfulCount()}>
            helpful: {helpfulCount}
          </div>
          <div onClick={() => updateViewAddAnswer()}>Add Answer</div>
          <div>user: {asker_name}</div>
          {/* {console.log(answers)} */}
          {Object.keys(answers).map((answerId) => (
            <div key={answers[answerId].id}>
              <Answer
                answer={answers[answerId]}
                updateAnswersHelpfulness={props.updateAnswersHelpfulness}
                reportAnswer={props.reportAnswer}
              />
            </div>
          )).slice(0, totalAnswerCount)}
          <button type="button" onClick={loadMoreAnswers}>Load More Answers</button>
          <div onDoubleClick={() => props.reportQuestion(question_id)}>Report</div>
        </div>
      );
    }
    if (view === 'addAnswer') {
      return (
        <AddAnswer questionId={question_id} postNewAnswer={props.postNewAnswer} />
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

// <div>
//   <div>QUESTION body: {question_body}</div>
//   <div>id: {question_id}</div>
//   <div onClick={() => props.updateQuestionsHelpfulness(question_id)}>helpful: {question_helpfulness}</div>
//   <div>user: {asker_name}</div>
//   {/* {console.log(answers)} */}
//   {Object.keys(answers).map((answerId) => (
//     <div>
//       <Answer
//         answer={answers[answerId]}
//         key={answers[answerId].id}
//         updateAnswersHelpfulness={props.updateAnswersHelpfulness}
//       />
//     </div>
//   )).slice(0, totalAnswerCount)}
//   <button type="button" onClick={loadMoreAnswers}>Load More Answers</button>
// </div>
// console.log('props', props.question[0]);
// console.log('body: ', props.question[0].question_body);