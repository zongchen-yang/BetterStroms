// This will be the strucute of my whole module.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import AddAnswer from './AddAnswer';
import QuestionsList from './QuestionsList';
import Search from './Search';

const QAndA = (props) => {
  const [questionsArray, setQuestionArray] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedArray, setSearchedArray] = useState(questionsArray);
  const [questionHelpful, setQuestionHelpful] = useState(false);
  const [answerHelpful, setAnswerHelpful] = useState(false);
  const [showAddAnswerModal, setAddAnswerModal] = useState(false);
  const [showAddQuestionModal, setAddQuestionModal] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  let [rerender, setRerender] = useState(0);

  const { product } = props;
  const { id } = product;

  async function getQuestions() {
    if (id) {
      const results = await axios.get(`/qa/questions?product_id=${id}&count=100`);
      setQuestionArray(results.data.results);
    }
  }

  const onSearchClick = (value) => {
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
    if (!questionHelpful) {
      axios.put(`/qa/questions/${questionId}/helpful`)
        .then(() => console.log('put request successful for question'))
        .catch((error) => console.log(error));
    }
  };

  const updateAnswersHelpfulness = (answerId) => {
    if (!answerHelpful) {
      axios.put(`/qa/answers/${answerId}/helpful`)
        .then(() => console.log('put request successful for answer'))
        .catch((error) => console.log(error));
    }
  };

  const reportQuestion = (questionId) => {
    axios.put(`/qa/questions/${questionId}/report`)
      .then(() => console.log('question reported'))
      .then(getQuestions())
      .catch((error) => console.log(error));
  };

  const reportAnswer = (answerId) => {
    axios.put(`/qa/answers/${answerId}/report`)
      .then(() => console.log('answer reported'))
      .then(getQuestions())
      .catch((error) => console.log(error));
  };

  const postNewQuestion = (body, name, email) => {
    axios.post('/qa/questions', {
      body,
      name,
      email,
      product_id: id,
    })
      .then((response) => console.log(response))
      .then(getQuestions())
      .catch((error) => console.log(error));
  };

  const postNewAnswer = (questionId, body, name, email, photos) => {
    // const requestBody = { body, name, email, photos };
    axios.post(`/qa/questions/${questionId}/answers`, {
      body,
      name,
      email,
      photos,
    })
      .then((response) => console.log(response))
      .then(getQuestions())
      .catch((error) => console.log(error));
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

  useEffect(() => { getQuestions(); }, [id]);

  return (
    <>
      <div
        onClick={showAddQuestionModal ? closeAddQuestionModal : () => {}}
        className={
          showAddAnswerModal | showAddQuestionModal
          ? "QandA-module question-unfocused"
          : "QandA-module"}>
        <h3 className="QandA-title">
          Questions and Answers
        </h3>
        <Search search={onSearchClick} />
        <div className="questions-list">
          {searched
            ? (
              <QuestionsList
                questions={searchedArray}
                updateQuestionsHelpfulness={updateQuestionsHelpfulness}
                updateAnswersHelpfulness={updateAnswersHelpfulness}
                reportQuestion={reportQuestion}
                reportAnswer={reportAnswer}
                openAddAnswerModal={openAddAnswerModal}
                openAddQuestionModal={openAddQuestionModal}
                getQuestionId={getQuestionId}
              />
            )
            : (
              <QuestionsList
                questions={questionsArray}
                updateQuestionsHelpfulness={updateQuestionsHelpfulness}
                updateAnswersHelpfulness={updateAnswersHelpfulness}
                reportQuestion={reportQuestion}
                reportAnswer={reportAnswer}
                openAddAnswerModal={openAddAnswerModal}
                openAddQuestionModal={openAddQuestionModal}
                getQuestionId={getQuestionId}
              />
            )}
        </div>
      </div>
      <div>
        {showAddAnswerModal
          ? (
            <AddAnswer
              questionId={questionId}
              postNewAnswer={postNewAnswer}
              closeAddAnswerModal={closeAddAnswerModal}
            />
          )
          : null}
        {showAddQuestionModal
          ? (
            <AddQuestion
              postNewQuestion={postNewQuestion}
              closeAddQuestionModal={closeAddQuestionModal}
            />
          )
          : null}
      </div>
    </>
  );
};

export default QAndA;
