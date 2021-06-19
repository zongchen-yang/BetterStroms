import React, { useState } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import AddAnswer from './AddAnswer';
import QuestionsList from './QuestionsList';
import Search from './Search';
import ClickTracking from '../../WithClickTrackingEventHandler';

const QAndA = (props) => {
  const { id, product, theme, getQuestions, questionsArray } = props;
  const [searched, setSearched] = useState(false);
  const [searchedArray, setSearchedArray] = useState(questionsArray);
  const [showAddAnswerModal, setAddAnswerModal] = useState(false);
  const [showAddQuestionModal, setAddQuestionModal] = useState(false);
  const [questionId, setQuestionId] = useState(0);

  const onSearch = (value) => {
    if (value === '') {
      setSearchedArray(questionsArray);
      setSearched(false);
    } else {
      setSearchedArray(questionsArray.filter((question) => (
        question.question_body.toLowerCase().includes(value.toLowerCase())
      )));
      setSearched(true);
    }
  };

  const updateQuestionsHelpfulness = (questionId) => {
    axios.put(`/qa/questions/${questionId}/helpful`)
      .then(() => {})
      .catch((error) => { throw error; });
  };

  const updateAnswersHelpfulness = (answerId) => {
    axios.put(`/qa/answers/${answerId}/helpful`)
      .then(() => {})
      .catch((error) => { throw error; });
  };

  const reportQuestion = (questionId) => {
    axios.put(`/qa/questions/${questionId}/report`)
      .then(() => {})
      .catch((error) => { throw error; });
  };

  const reportAnswer = (answerId) => {
    axios.put(`/qa/answers/${answerId}/report`)
      .then(() => {})
      .catch((error) => { throw error; });
  };

  const postNewQuestion = (body, name, email) => {
    axios.post('/qa/questions', {
      body,
      name,
      email,
      product_id: id,
    })
      // .then((response) => console.log(response))
      .then(() => getQuestions())
      .catch((error) => { throw error; });
  };

  const postNewAnswer = (currentQuestionId, body, name, email, photos) => {
    axios.post(`/qa/questions/${currentQuestionId}/answers`, {
      body,
      name,
      email,
      photos,
    })
      // .then((response) => console.log(response))
      .then(() => getQuestions())
      .catch((error) => { throw error; });
  };

  const openAddAnswerModal = () => {
    setAddAnswerModal(true);
  };

  const closeAddAnswerModal = () => {
    setAddAnswerModal(false);
  };

  const openAddQuestionModal = () => {
    setAddQuestionModal(true);
  };

  const closeAddQuestionModal = () => {
    setAddQuestionModal(false);
  };

  const getQuestionId = (currentQuestionId) => {
    setQuestionId(currentQuestionId);
  };

  const closeModals = () => {
    closeAddAnswerModal();
    closeAddQuestionModal();
  };

  return (
    <>
      <ClickTracking module="QandA">
        <div
          id="QandA-module"
          role="button"
          tabIndex="0"
          onKeyDown={showAddQuestionModal || showAddAnswerModal ? closeModals : () => {}}
          onClick={showAddQuestionModal || showAddAnswerModal ? closeModals : () => {}}
          className={
            showAddAnswerModal || showAddQuestionModal
              ? 'QandA-module question-unfocused'
              : 'QandA-module'
            }
        >
          <h3 className="QandA-title">
            Questions and Answers
          </h3>
          <Search search={onSearch} />
          <div className="questions-list-component">
            <QuestionsList
              questions={searched ? searchedArray : questionsArray}
              updateQuestionsHelpfulness={updateQuestionsHelpfulness}
              updateAnswersHelpfulness={updateAnswersHelpfulness}
              reportQuestion={reportQuestion}
              reportAnswer={reportAnswer}
              openAddAnswerModal={openAddAnswerModal}
              openAddQuestionModal={openAddQuestionModal}
              getQuestionId={getQuestionId}
              theme={theme}
            />
          </div>
        </div>
        <div>
          {showAddAnswerModal
            ? (
              <AddAnswer
                questionId={questionId}
                postNewAnswer={postNewAnswer}
                closeAddAnswerModal={closeAddAnswerModal}
                theme={theme}
              />
            )
            : null}
          {showAddQuestionModal
            ? (
              <AddQuestion
                postNewQuestion={postNewQuestion}
                closeAddQuestionModal={closeAddQuestionModal}
                name={product.name}
                theme={theme}
              />
            )
            : null}
        </div>
      </ClickTracking>
    </>
  );
};

export default QAndA;

// async function getQuestions() {
//   if (id) {
//     const results = await axios.get(`/qa/questions?product_id=${id}&count=100`);
//     setQuestionArray(results.data.results);
//   }
// }
// const addHighlightedText = (body, input) => {
//   const frontIndex = body.indexOf(input);
//   const backIndex = body.indexOf(input) + input.length;
//   if (body.includes(input)) {
//     const newBody = `${body.slice(0, frontIndex)}<mark>${input}</mark>${body.slice(backIndex)}`;
//     return newBody;
//   }
// };
// useEffect(() => { getQuestions(); }, [id]);
