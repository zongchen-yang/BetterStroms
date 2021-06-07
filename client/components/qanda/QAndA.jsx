// This will be the strucute of my whole module.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import NewAnswer from './NewAnswer';
import QuestionsList from './QuestionsList';
import Search from './Search';

const QAndA = (props) => {
  const [questionsArray, setQuestionId] = useState([]);
  // useEffect(() => {
  const { product } = props;
  const { id } = product;
  console.log('this is the product id', id);
  async function getQuestions() {
    if (id) {
      const results = await axios.get(`http://localhost:3000/qa/questions?product_id=${id}`);
      setQuestionId(results.data.results);
    }
  }
  console.log(questionsArray);
  // });
  useEffect(() => { getQuestions(); }, [id]);
  return (
    <div>
      Hello from QandA
      <Search />
      <div>
        <QuestionsList questions={questionsArray} />
      </div>
      {/* {questionsArray.map((question) => (
        <QuestionsList question={question} key={question.question_id} />
      ))} */}
    </div>
  );
};

export default QAndA;
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