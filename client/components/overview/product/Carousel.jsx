import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Carousel({ style, photoIndex, clickHandler }) {
  // 0 = initial, 1 = deexpand, 2 = expand
  const [expanded, setExpanded] = useState(0);
  const [leftHidden, setLeftHidden] = useState(false);
  const [rightHidden, setRightHidden] = useState(false);
  let mainImage;
  let imageSource;
  if (!style.photos[photoIndex]) {
    imageSource = style.photos[0].url;
  } else {
    imageSource = style.photos[photoIndex].url;
  }

  function expandImage() {
    if (expanded < 2) {
      setExpanded(2);
      setTimeout(() => { setExpanded(3); }, 450);
    } else {
      setExpanded(1);
      setTimeout(() => { setExpanded(0); }, 450);
    }
  }
  const imgStyle = {
    animationPlayState: 'running',
  };
  if (expanded === 2) {
    mainImage = <img id="mainImage" style={imgStyle} className="expanding" alt="hi" src={imageSource} />;
  } else if (expanded === 1) {
    mainImage = <img id="mainImage" style={imgStyle} className="deexpanding" alt="hi" src={imageSource} />;
  } else if (expanded === 3) {
    mainImage = <img id="mainImage" style={imgStyle} className="expanded" alt="hi" src={imageSource} />;
  } else {
    mainImage = <img id="mainImage" alt="hi" src={imageSource} />;
  }

  useEffect(() => {
    if (photoIndex === 0) {
      setLeftHidden(true);
    } else {
      setLeftHidden(false);
    };

    if (photoIndex === style.photos.length - 1) {
      setRightHidden(true);
    } else {
      setRightHidden(false);
    }
  }, [photoIndex]);
  return (
    <div>
      <button type="button" onClick={expandImage}>expand</button>
      <div id="mainImageContainer">
        <button hidden={leftHidden} type="button" onClick={(e) => clickHandler('left')}>left</button>
        {mainImage}
        <button hidden={rightHidden} type="button" onClick={(e) => clickHandler('right')}>right</button>
      </div>
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
