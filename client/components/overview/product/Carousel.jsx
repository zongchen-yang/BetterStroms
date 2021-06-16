import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Carousel({ style, photoIndex, clickHandler }) {
  // 0 = initial, 1 = deexpanding, 2 = expanding, 3 = expanded
  const [expanded, setExpanded] = useState(0);
  const [leftHidden, setLeftHidden] = useState(false);
  const [rightHidden, setRightHidden] = useState(false);
  const [zoomed, setZoomed] = useState(false);

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

  function toggleZoom(event) {
    console.log(event)
    if (zoomed) {
      // zoom out
      setZoomed(false);
    } else {
      // zoom in
      setZoomed(true);
    }
  }

  const imgStyle = {
    animationPlayState: 'running',
  };
  if (expanded === 2) {
    mainImage = <img id="mainImage" hidden={zoomed} style={imgStyle} className="expanding" alt="hi" src={imageSource} />;
  } else if (expanded === 1) {
    mainImage = <img id="mainImage" hidden={zoomed} style={imgStyle} className="deexpanding" alt="hi" src={imageSource} />;
  } else if (expanded === 3) {
    mainImage = <img id="mainImage" onClick={toggleZoom} hidden={zoomed} style={imgStyle} className="expanded" alt="hi" src={imageSource} />;
  } else {
    mainImage = <img id="mainImage" hidden={zoomed} alt="hi" src={imageSource} />;
  }
  let overlayDisplay = 'none';
  if (zoomed) {
    overlayDisplay = 'inline-block';
  }

  const overlayStyle = {
    border: '1px solid black',
    display: overlayDisplay,
    backgroundImage: `url('${imageSource}')`,
    backgroundRepeat: 'no-repeat',
    width: '1320px',
    height: '891px',
  };

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
  const notZoomed = !zoomed;
   return (
    <div>
      <button type="button" onClick={expandImage}>expand</button>
      <button hidden={leftHidden} type="button" onClick={(e) => clickHandler('left')}>left</button>
      <div id="main-image-container">
        {mainImage}
        <div style={overlayStyle} onClick={toggleZoom} id="main-image-overplay" />
      </div>
      <button hidden={rightHidden} type="button" onClick={(e) => clickHandler('right')}>right</button>
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