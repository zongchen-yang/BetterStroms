// This will be the strucute of my whole module.
import React from 'react';
import AddQuestion from './AddQuestion';
import NewAnswer from './NewAnswer';
import QuestionsList from './QuestionsList';
import Search from './Search';

const QandA = (props) => (
  <div>
    Hello from QandA
    <AddQuestion />
    <NewAnswer />
    <QuestionsList />
    <Search />
  </div>
);

export default QandA;
