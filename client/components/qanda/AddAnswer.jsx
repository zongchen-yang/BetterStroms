import React, { useState, useEffect } from 'react';

const AddAnswer = (props) => {
  const {questionId, postNewAnswer, closeAddAnswerModal} = props;
  const [nameInput, setNameInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [photoUrl1, setPhoto1] = useState('');
  const [photo1Valid, setPhoto1Valid] = useState(true);
  const [photoUrl2, setPhoto2] = useState('');
  const [photo2Valid, setPhoto2Valid] = useState(true);
  const [photoUrl3, setPhoto3] = useState('');
  const [photo3Valid, setPhoto3Valid] = useState(true);
  const [photosArray, setPhotosArray] = useState([]);
  const [showError, setShowError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  // console.log('this is the current question id', questionId);

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

  function imageExists(url, callback) {
    const img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  const handleAddAnswer = () => {
    const newArray = [];
    if (photoUrl1 !== '') {
      // imageExists(photoUrl1, setPhoto1Valid);
      // if (setPhoto1Valid) {
      newArray.push(photoUrl1);
      // }
    }
    if (photoUrl2 !== '') {
      newArray.push(photoUrl2);
    }
    if (photoUrl3 !== '') {
      newArray.push(photoUrl3);
    }
    // for(const url of newArray) {
    //   imageExists(url, )
    // }
    if (nameInput === '' || bodyInput === '' || !validEmail || !photo1Valid) {
      setShowError(true);
    } else {
      postNewAnswer(questionId, bodyInput, nameInput, emailInput, newArray);
      closeAddAnswerModal();
    }
  };

  return (
    <div className="add-answer-modal">
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
            placeholder="Example: jack543!!"
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
            placeholder="Example: jack@email.com"
            size="50"
          />
        </div>
        <div className="modal-input input-flavor">For authentication reasons, you will not be emailed</div>
      </div>
      <div className="modal-input">
        Upload Your Photos
        <div>
          <input className="modal-input-box" onChange={handlePhotoChange1} />
        </div>
        <div>
          <input className="modal-input-box" onChange={handlePhotoChange2} />
        </div>
        <div>
          <input className="modal-input-box" onChange={handlePhotoChange3} />
        </div>
      </div>
      <button type="button" onClick={() => handleAddAnswer()}>Add Answer</button>
      <button type="button" onClick={() => closeAddAnswerModal()}>CLOSE</button>
      {showError
        ? <div>You must enter the following: Question, Nickname, Valid Email</div>
        : null}
    </div>
  );
};

export default AddAnswer;
