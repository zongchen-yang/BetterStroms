// This will be the strucute of my whole module.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import AddAnswer from './AddAnswer';
import QuestionsList from './QuestionsList';
import Search from './Search';

const QAndA = (props) => {
  const [questionsArray, setQuestionId] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedArray, setSearchedArray] = useState(questionsArray);
  const [questionHelpful, setQuestionHelpful] = useState(false);
  const [answerHelpful, setAnswerHelpful] = useState(false);

  const { product } = props;
  const { id } = product;

  async function getQuestions() {
    if (id) {
      const results = await axios.get(`/qa/questions?product_id=${id}&count=100`);
      setQuestionId(results.data.results);
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
      // setQuestionHelpful(true);
    }
    // else {
    //   alert('you already said this was helpful');
    // }
  };

  const updateAnswersHelpfulness = (answerId) => {
    if(!answerHelpful) {
      axios.put(`/qa/answers/${answerId}/helpful`)
        .then(() => console.log('put request successful for answer'))
        .catch((error) => console.log(error));
      // setAnswerHelpful(true);
    }
  };

  const reportQuestion = () => {

  };

  const reportAnswer = () => {

  };

  const postNewQuestion = (body, name, email) => {
    // axios.post()
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
      .catch((error) => console.log(error));
  };
  useEffect(() => { getQuestions(); }, [id]);
  return (
    <div className="QandA-module">
      Questions and Answers
      <Search search={onSearchClick} />
      <div className="questions-list">
        {searched
          ? (
            <QuestionsList
              questions={searchedArray}
              updateQuestionsHelpfulness={updateQuestionsHelpfulness}
              updateAnswersHelpfulness={updateAnswersHelpfulness}
              postNewAnswer={postNewAnswer}
            />
          )
          : (
            <QuestionsList
              questions={questionsArray}
              updateQuestionsHelpfulness={updateQuestionsHelpfulness}
              updateAnswersHelpfulness={updateAnswersHelpfulness}
              postNewAnswer={postNewAnswer}
            />
          )
        }
      </div>
    </div>
  );
};

export default QAndA;
