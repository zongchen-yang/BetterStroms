// This will be the strucute of my whole module.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import NewAnswer from './NewAnswer';
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
      const results = await axios.get(`http://localhost:3000/qa/questions?product_id=${id}`);
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
      axios.put(`http://localhost:3000/qa/questions/${questionId}/helpful`)
        .then(() => console.log('put request successful for question'))
        .catch((error) => console.log(error));
      setQuestionHelpful(true);
    }
    // else {
    //   alert('you already said this was helpful');
    // }
  };

  const updateAnswersHelpfulness = (answerId) => {
    if(!answerHelpful) {
      axios.put(`http://localhost:3000/qa/answers/${answerId}/helpful`)
        .then(() => console.log('put request successful for answer'))
        .catch((error) => console.log(error));
      setAnswerHelpful(true);
    }
  };

  const reportQuestion = () => {

  };

  const reportAnswer = () => {

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
            />
          )
          : (
            <QuestionsList
              questions={questionsArray}
              updateQuestionsHelpfulness={updateQuestionsHelpfulness}
              updateAnswersHelpfulness={updateAnswersHelpfulness}
            />
          )
        }
      </div>
    </div>
  );
};

export default QAndA;
{/* {questionsArray.map((question) => (
  <QuestionsList question={question} key={question.question_id} />
))} */}
// <AddQuestion />
// <NewAnswer />

// .then((data) => { setQuestionId(data.data.results); console.log(questionsArray);})
// .catch((error) => console.log(error));
// console.log(results)
// conosle.log(results.data.results)
// console.log(questionsArray);

// fetch(`http://localhost:3000/qa/questions?product_id=${id}`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));