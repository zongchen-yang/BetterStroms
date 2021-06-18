import React, { useState } from 'react';

const AddQuestion = (props) => {
  const {postNewQuestion, closeAddQuestionModal, name, theme} = props;
  const [nameInput, setNameInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const checkValidEmail = (value) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
    checkValidEmail(event.target.value);
  };

  const handleAddQuestion = () => {
    if (!validEmail || nameInput === '' || bodyInput === '') {
      setShowError(true);
    } else {
      postNewQuestion(bodyInput, nameInput, emailInput);
      closeAddQuestionModal();
    }
  };

  return (
    <div className={theme ? 'add-question-modal' : 'add-question-modal dark-modal'}>
      <h2>Ask Your Question</h2>
      <h4>
        About the
        {name}
      </h4>
      <div className="modal-input">
        Your Question *
        <div className="modal-input">
          <textarea
            className="modal-input-box"
            onChange={handleBodyChange}
            maxLength="1000"
            placeholder=""
            rows="5"
            cols="50"
          />
        </div>
      </div>
      <div className="modal-input">
        What is your nickname *
        <div className="modal-input">
          <input
            className="modal-input-box"
            onChange={handleNameChange}
            maxLength="60"
            placeholder="Example: jackson11!"
            size="50"
          />
        </div>
        <div className="modal-input input-flavor">For privacy reasons, do not use your full name or email address</div>
      </div>
      <div className="modal-input">
        Your Email*
        <div className="modal-input">
          <input
            className="modal-input-box"
            onChange={handleEmailChange}
            maxLength="60"
            placeholder="Example: jackson@email.com"
            size="50"
          />
        </div>
        <div className="modal-input input-flavor">For authentication reasons, you will not be emailed</div>
      </div>
      <button
        className="button-questions"
        type="button"
        onClick={() => handleAddQuestion()}
      >
        Submit Question
      </button>
      <button
        className="button-questions"
        type="button"
        onClick={() => closeAddQuestionModal()}
      >
        CLOSE
      </button>
      {showError
        ? <div>You must enter the following: Question, Nickname, Valid Email</div>
        : null}
    </div>
  );
};

export default AddQuestion;
