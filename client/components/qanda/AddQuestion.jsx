import React, { useState, useEffect } from 'react';

const AddQuestion = (props) => {
  const {postNewQuestion, closeAddQuestionModal} = props;
  const [nameInput, setNameInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleAddQuestion = () => {
    postNewQuestion(bodyInput, nameInput, emailInput);
    closeAddQuestionModal();
  }

  return (
    <div className="add-question-modal">
      <div>
        Name
        <input onChange={handleNameChange} />
      </div>
      <div>
        Body
        <textarea onChange={handleBodyChange} />
      </div>
      <div>
        Email
        <input onChange={handleEmailChange} />
      </div>
      <button type="button" onClick={() => handleAddQuestion()}>Add Question</button>
      <button type="button" onClick={() => closeAddQuestionModal()}>CLOSE</button>
    </div>
  );
};


export default AddQuestion;
