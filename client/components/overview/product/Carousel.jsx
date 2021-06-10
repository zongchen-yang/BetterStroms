import React from 'react';
import PropTypes from 'prop-types';

function Carousel({ style, photoIndex, clickHandler }) {
  return (
    <div>
      <button type="button" onClick={(e) => clickHandler('left')}>left</button>
      <img alt="hi" height="300" width="200" src={style.photos[photoIndex].url} />
      <button type="button" onClick={(e) => clickHandler('right')}>right</button>
    </div>
  );
}

export default Carousel;

// Carousel.propTypes = {
//   style: PropTypes.shape({
//     photos: PropTypes.object.isRequired,
//   }).isRequired,
//   photoIndex: PropTypes.number.isRequired,
//   clickHandler: PropTypes.function.isRequired,
// };
