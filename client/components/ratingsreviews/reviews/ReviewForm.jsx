import React, { useState } from 'react';
import axios from 'axios';
import CharacteristicRadioButtons from './CharacteristicRadioButtons';
import ReviewFormPhotos from './ReviewFormPhotos';

const ReviewForm = ({
  showReviewFormHandler, reviewMeta, id, sortByDate, theme
}) => {
  const [rated, toggleRated] = useState(false);
  const [starRating, setStarRating] = useState([]);
  const [rating, setRating] = useState(0);
  const [recommended, setRecommended] = useState(true);
  const [radioValues, setRadioValues] = useState({});
  const [nameInput, setNameInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [newReviewPhoto, setNewReviewPhoto] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);
  const newId = id.toString();

  const characteristicRadioHandler = (e, dbId) => {
    const temp = radioValues;
    temp[dbId] = parseInt(e.target.id, 10);
    setRadioValues(temp);
  };

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummaryInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleStarSelection = (val) => {
    const terms = {1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Great'}
    const stars = [];
    for (let i = 0; i < val; i++) {
      stars.push(<div><i className="fas fa-star" /></div>);
    }
    for (let j = 0; j < 5 - val; j++) {
      stars.push(<div><i className="far fa-star" /></div>);
    }
    stars.push(<div className="formReviewRatingDescription">{terms[val]}</div>);

    // if (val === 2) {
    //   stars.push(<div className="formReviewRatingDescription">Fair</div>);
    // }
    // if (val === 3) {
    //   stars.push(<div className="formReviewRatingDescription">Average</div>);
    // }
    // if (val === 4) {
    //   stars.push(<div className="formReviewRatingDescription">Good</div>);
    // }
    // if (val === 5) {
    //   stars.push(<div className="formReviewRatingDescription">Great</div>);
    // }
    setStarRating(stars);
    setRating(val);
    toggleRated(true);
  };

  const recommendationHandler = (e) => {
    if (e.target.value === 'no') {
      setRecommended(false);
    } else if (e.target.value === 'yes') {
      setRecommended(true);
    }
  };

  const sendForm = () => {
    axios.post('/reviews', {
      product_id: id,
      rating,
      summary: summaryInput,
      body: bodyInput,
      recommend: recommended,
      name: nameInput,
      email: emailInput,
      photos: photoList,
      characteristics: radioValues,
    })
      .then((response) => console.log(response))
      .then(() => (sortByDate()))
      .catch((error) => console.log(error));
  };

  const submitHandler = () => {
    let needToAlert = false;
    if (emailInput.indexOf('@') === -1) {
      var temp = alertMessage;
      temp.push('A Valid Email \n');
      setAlertMessage(temp);
      needToAlert = true;
    }
    if (bodyInput.length < 50 || bodyInput.length > 1000) {
      var temp = alertMessage;
      temp.push(' A body between 50 and 1000 characters \n');
      setAlertMessage(temp);
      needToAlert = true;
    }
    if (nameInput.length < 3 || nameInput.length > 60) {
      var temp = alertMessage;
      temp.push(' A valid username \n');
      setAlertMessage(temp);
      needToAlert = true;
    }
    if (Object.keys(radioValues).length !== Object.keys(reviewMeta.characteristics).length) {
      var temp = alertMessage;
      temp.push(' A rating selection for each characteristic ');
      setAlertMessage(temp);
      needToAlert = true;
    }
    if (needToAlert) {
      setAlert(true);
    } else {
      sendForm();
    }
  };

  const handlePhotoChange = (e) => {
    setNewReviewPhoto(e.target.value);
  };

  const handlePhotoSubmit = (e) => {
    const temp = photoList;
    temp.push(newReviewPhoto);
    setPhotoList(temp);
    setNewReviewPhoto('');
    e.preventDefault();
  };

  return (
    <div className={theme ? 'add-review-box' : 'add-review-box-dark'}>
      <div>Rating</div>
      <div className="reviewFormStarContainer">
        {rated ? starRating
          : (
            <>
              <div className="reviewStar" onClick={(e) => handleStarSelection(1)}><i className="far fa-star" /></div>
              <div className="reviewStar" onClick={(e) => handleStarSelection(2)}><i className="far fa-star" /></div>
              <div className="reviewStar" onClick={(e) => handleStarSelection(3)}><i className="far fa-star" /></div>
              <div className="reviewStar" onClick={(e) => handleStarSelection(4)}><i className="far fa-star" /></div>
              <div className="reviewStar" onClick={(e) => handleStarSelection(5)}><i className="far fa-star" /></div>
            </>
          )}
      </div>

      <form>
        <div>Do you recommend this product?</div>
        <div>
          <input
            type="radio"
            id="yes"
            name="recommend"
            value="yes"
            onClick={(e) => (recommendationHandler(e))}
            checked
          />
          <label htmlFor="yes">Yes</label>
        </div>

        <div>
          <input type="radio" id="no" name="recommend" value="no" onClick={(e) => (recommendationHandler(e))} />
          <label htmlFor="no">No</label>
        </div>
      </form>
      <CharacteristicRadioButtons
        reviewMeta={reviewMeta}
        characteristicRadioHandler={characteristicRadioHandler}
      />
      <div>
        Review Summary
        <textarea placeholder="Example: Best Purchase Ever!" onChange={handleSummaryChange} />
      </div>
      <div>
        Body
        <textarea placeholder="Why did you like the product or not?" onChange={handleBodyChange} />
        {(bodyInput.length > 50)
          ? <div className="body-input-length">minimum reached</div>
          : (
            <div className="body-input-length">
              'Minimum characters left:
              {50 - bodyInput.length}
            </div>
          )}
      </div>

      <form onSubmit={(e) => (handlePhotoSubmit(e))}>
        <label>
          Photos:
          <input type="text" value={newReviewPhoto} onChange={handlePhotoChange} />
        </label>
        {photoList.length < 5 ? <input id="submit-photos" type="submit" value="Submit" /> : null }
        {photoList.length > 0
          ? photoList.map((photo, index) =>
            (<ReviewFormPhotos photo={photo} key={index} />)) : null}
      </form>

      <div>
        Nickname
        <input placeholder="Example: jackson11!" onChange={handleNameChange} />
        <div className="body-input-length">
          “For privacy reasons, do not use your full name or email address”
        </div>
      </div>
      <div>
        Email
        <input placeholder="Example: jackson11@email.com" onChange={handleEmailChange} />
        <div className="body-input-length">
          “For authentication reasons, you will not be emailed”
        </div>
      </div>
      { alert ? (
        <div>
          You must enter the following:
          {alertMessage.map((message, index) => (<div className="alertMessage" id={index}>{message}</div>))}
        </div>
      ) : null }
      <button type="button" id="review-form-submit" onClick={() => submitHandler()}>SUBMIT</button>
      <button type="button" id="review-form-close" onClick={() => showReviewFormHandler()}>CLOSE</button>
    </div>
  );
};

export default ReviewForm;
