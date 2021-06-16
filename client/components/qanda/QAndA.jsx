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
  // const [answersArray, setAnswersArray] = useState([])
  // let [rerender, setRerender] = useState(0);

  const { product } = props;
  const { id, name } = product;

  async function getQuestions() {
    if (id) {
      const results = await axios.get(`/qa/questions?product_id=${id}&count=100`);
      setQuestionArray(results.data.results);
    }
  }

  const addHighlightedText = (body, input) => {
    const frontIndex = body.indexOf(input);
    const backIndex = body.indexOf(input) + input.length;
    if (body.includes(input)) {
      const newBody = `${body.slice(0, frontIndex)}<mark>${input}</mark>${body.slice(backIndex)}`;
      return newBody;
    }
  };

  const onSearch = (value) => {
    if (value === '') {
      setSearchedArray(questionsArray);
      setSearched(false);
    // } else {
    //   let newArray = questionsArray.filter((question) => (
    //     question.question_body.toLowerCase().includes(value.toLowerCase())
    //   ));
    //   for (const question of newArray) {
    //     question.question_body = addHighlightedText(question.question_body, value.toLowerCase())
    //   }
    //   setSearchedArray([...newArray]);
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
      .catch((error) => console.log(error));
  };

  const reportAnswer = (answerId) => {
    axios.put(`/qa/answers/${answerId}/report`)
      .then(() => console.log('answer reported'))
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
      .then(() => getQuestions())
      .catch((error) => console.log(error));
  };

  const postNewAnswer = (questionId, body, name, email, photos) => {
    // const requestBody = { body, name, email, photos };
    // axios.post(`/qa/questions/${questionId}/answers`, requestBody)
    axios.post(`/qa/questions/${questionId}/answers`, {
      body,
      name,
      email,
      photos,
    })
      .then((response) => console.log(response))
      .then(() => getQuestions())
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

  const closeModals = () => {
    closeAddAnswerModal();
    closeAddQuestionModal();
  };

  useEffect(() => { getQuestions(); }, [id]);

  return (
    <>
      <div
        id="QandA-module"
        onClick={showAddQuestionModal || showAddAnswerModal ? closeModals : () => {}}
        className={
          showAddAnswerModal || showAddQuestionModal
          ? "QandA-module question-unfocused"
          : "QandA-module"}>
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
            />
          )
          : null}
        {showAddQuestionModal
          ? (
            <AddQuestion
            postNewQuestion={postNewQuestion}
            closeAddQuestionModal={closeAddQuestionModal}
            name={name}
            />
          )
          : null}
      </div>
    </>
  );
};

export default QAndA;
