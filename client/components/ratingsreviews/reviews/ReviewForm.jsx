import React, { useState } from 'react';
import CharacteristicRadioButtons from './CharacteristicRadioButtons';

const ReviewForm = ({ showReviewFormHandler, reviewMeta }) => {
  const [rated, toggleRated] = useState(true);
  const [starRating, setRating] = useState([]);
  const [recommended, setRecommended] = useState(true);

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleStarSelection = (val) => {
    console.log('clicked:', val);
    const stars = starRating;
    for (let i = 0; i < val; i++) {
      stars.push(<i className="fas fa-star" />);
    }
    for (let j = 0; j < 5 - val; j++) {
      stars.push(<i className="far fa-star" />);
    }
    if (val === 1) {
      stars.push(<div className="formReviewRatingDescription">Poor</div>);
    }
    if (val === 2) {
      stars.push(<div className="formReviewRatingDescription">Fair</div>);
    }
    if (val === 3) {
      stars.push(<div className="formReviewRatingDescription">Average</div>);
    }
    if (val === 4) {
      stars.push(<div className="formReviewRatingDescription">Good</div>);
    }
    if (val === 5) {
      stars.push(<div className="formReviewRatingDescription">Great</div>);
    }
    setRating(stars);
    toggleRated(true);
  };

  const recommendationHandler = (e) => {
    if (e.target.value === 'no') {
      setRecommended(false);
    } else if (e.target.value === 'yes') {
      setRecommended(true);
    }
  };

  return (
    <div className="add-review-box">
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
      <CharacteristicRadioButtons reviewMeta={reviewMeta} />
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
      <button type="button" onClick={() => showReviewFormHandler()}>CLOSE</button>
    </div>
  );
};

export default ReviewForm;
