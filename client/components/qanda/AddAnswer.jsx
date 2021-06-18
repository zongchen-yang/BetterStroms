import React, { useState, useEffect } from 'react';
import ClickTracking from '../../WithClickTrackingEventHandler';

const AddAnswer = (props) => {
  const {questionId, postNewAnswer, closeAddAnswerModal, theme} = props;
  const [nameInput, setNameInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [photoUrl1, setPhoto1] = useState('');
  const [photoUrl2, setPhoto2] = useState('');
  const [photoUrl3, setPhoto3] = useState('');
  const [showError, setShowError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const checkValidEmail = (value) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
    checkValidEmail(event.target.value);
  };

  const handlePhotoChange1 = (event) => {
    setPhoto1(event.target.value);
  };

  const handlePhotoChange2 = (event) => {
    setPhoto2(event.target.value);
  };

  const handlePhotoChange3 = (event) => {
    setPhoto3(event.target.value);
  };

  const handleAddAnswer = () => {
    const newArray = [];
    if (photoUrl1 !== '') {
      newArray.push(photoUrl1);
    }
    if (photoUrl2 !== '') {
      newArray.push(photoUrl2);
    }
    if (photoUrl3 !== '') {
      newArray.push(photoUrl3);
    }
    if (nameInput === '' || bodyInput === '' || !validEmail) {
      setShowError(true);
    } else {
      postNewAnswer(questionId, bodyInput, nameInput, emailInput, newArray);
      closeAddAnswerModal();
    }
  };

  return (
    <div className={theme ? 'add-answer-modal' : 'add-answer-modal dark-modal'}>
      <div className="modal-input">
        Your Answer *
        <div className="modal-input">
          <ClickTracking element="Add answer body input" module="QandA">
            <textarea
              className="modal-input-box"
              onChange={handleBodyChange}
              maxLength="1000"
              placeholder=""
              rows="5"
              cols="50"
            />
          </ClickTracking>
        </div>
      </div>
      <div className="modal-input">
        What is your nickname *
        <div className="modal-input">
          <ClickTracking element="Add answer name input" module="QandA">
            <input
              className="modal-input-box"
              onChange={handleNameChange}
              maxLength="60"
              placeholder="Example: jack543!!"
              size="50"
            />
          </ClickTracking>
        </div>
        <div className="modal-input input-flavor">For privacy reasons, do not use your full name or email address</div>
      </div>
      <div className="modal-input">
        Your Email*
        <div className="modal-input">
          <ClickTracking element="Add answer email input" module="QandA">
            <input
              className="modal-input-box"
              onChange={handleEmailChange}
              maxLength="60"
              placeholder="Example: jack@email.com"
              size="50"
            />
          </ClickTracking>
        </div>
        <div className="modal-input input-flavor">For authentication reasons, you will not be emailed</div>
      </div>
      <div className="modal-input">
        Upload Your Photos
        <div>
          <ClickTracking element="Add answer photo1 input" module="QandA">
            <input className="modal-input-box" onChange={handlePhotoChange1} />
          </ClickTracking>
        </div>
        <div>
          <ClickTracking element="Add answer photo2 input" module="QandA">
            <input className="modal-input-box" onChange={handlePhotoChange2} />
          </ClickTracking>
        </div>
        <div>
          <ClickTracking element="Add answer photo3 input" module="QandA">
            <input className="modal-input-box" onChange={handlePhotoChange3} />
          </ClickTracking>
        </div>
      </div>
      <ClickTracking element="Add answer submit question" module="QandA">
        <button
          className="button-questions"
          type="button"
          onClick={() => handleAddAnswer()}
        >
          Submit Answer
        </button>
      </ClickTracking>
      <button
        className="button-questions"
        type="button"
        onClick={() => closeAddAnswerModal()}
      >
        CLOSE
      </button>
      {showError
        ? <div>You must enter the following: Question, Nickname, Valid Email</div>
        : null}
    </div>
  );
};

export default AddAnswer;

// function imageExists(url, callback) {
//   const img = new Image();
//   img.onload = function() { callback(true); };
//   img.onerror = function() { callback(false); };
//   img.src = url;
// }
