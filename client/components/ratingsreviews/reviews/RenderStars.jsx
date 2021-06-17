import React from 'react';

const RenderStars = ({ rating }) => {
  const whole = rating.whole || Math.floor(rating);

  return (
    <div>
      <div className="review-shownRating">
        {[...Array(whole)].map((each, i) => <div key={i}><i className="fas fa-star" /></div>)}
        {rating.part ? <div><i className="fas fa-star" style={{ width: rating.part, overflow: 'hidden' }} /></div> : null}
        {rating.part ? (
          <div className="review-hiddenRating">
            {[...Array(5)].map((each, i) => <div key={i}><i className="far fa-star" /></div>)}
          </div>
        ) : (
          <div className="review-hiddenRating">
            {[...Array(5)].map((each, i) => <i className="far fa-star" key={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderStars;
