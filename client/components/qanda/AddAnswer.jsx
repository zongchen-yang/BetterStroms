import React, { useState, useEffect } from 'react';

const AddAnswer = (props) => {
  const {questionId, postNewAnswer, closeAddAnswerModal} = props;
  const [nameInput, setNameInput] = useState('');
  const [bodyInput, setBodyinput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [photoUrl1, setPhoto1] = useState('');
  const [photoUrl2, setPhoto2] = useState('');
  const [photoUrl3, setPhoto3] = useState('');
  const [photosArray, setPhotosArray] = useState([]);

  console.log('this is the current question id', questionId)

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyinput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
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
    postNewAnswer(questionId, bodyInput, nameInput, emailInput, newArray);
    closeAddAnswerModal();
  };

  return (
    <div className="add-answer-modal">
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
      <div>
        Photos
        <input onChange={handlePhotoChange1} />
        <input onChange={handlePhotoChange2} />
        <input onChange={handlePhotoChange3} />
      </div>
      <button type="button" onClick={() => handleAddAnswer()}>Add Answer</button>
      <button type="button" onClick={() => closeAddAnswerModal()}>CLOSE</button>
    </div>
  );
};

export default AddAnswer;
