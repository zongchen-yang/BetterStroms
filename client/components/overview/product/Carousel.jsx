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
  if (!photoIndex) {
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
    console.log(event);
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
    mainImage = <div style={imgStyle} className="expanding" id="main-image-container"><img hidden={zoomed} id="mainImage" alt="hi" src={imageSource} /></div>;
  } else if (expanded === 1) {
    mainImage = <div style={imgStyle} className="deexpanding" id="main-image-container"><img id="mainImage" hidden={zoomed} alt="hi" src={imageSource} /></div>;
  } else if (expanded === 3) {
    mainImage = <div style={imgStyle} className="expanded" id="main-image-container"><img id="mainImage" onClick={toggleZoom} hidden={zoomed} alt="hi" src={imageSource} /></div>;
  } else {
    mainImage = <div id="main-image-container"><img id="mainImage" hidden={zoomed} alt="hi" src={imageSource} /></div>;
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
    if ((photoIndex === 0) || (expanded > 0)) {
      setLeftHidden(true);
    } else {
      setLeftHidden(false);
    };

    if ((photoIndex === style.photos.length - 1) || expanded > 0) {
      setRightHidden(true);
    } else {
      setRightHidden(false);
    }
  }, [photoIndex, expanded]);
  const notZoomed = !zoomed;
  // const shevron = (
  //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
  //     <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  //   </svg>
  // );
  const shevron = (
    <img src="assets/shevron_outlined.svg" alt="" width="64" height="64" />
  );
  return (
    <div id="main-carousel">
      <div id="main-carousel-inner">
        <div id="carousel-shevron-left" className="carousel-shevron-container">
          <button id="c-left" className="carousel-shevrons" hidden={leftHidden} type="button" onClick={(e) => clickHandler('left')}>
            {shevron}
          </button>
        </div>
        {/* <div id="main-image-container"> */}
          {mainImage}
          {/* <div style={overlayStyle} onClick={toggleZoom} id="main-image-overplay" />
        </div> */}
        <div id="carousel-shevron-right" className="carousel-shevron-container">
          <button id="c-right" className="carousel-shevrons" hidden={rightHidden} type="button" onClick={(e) => clickHandler('right')}>
            {shevron}
          </button>
        </div>
      </div>
      <div id="expand-image-container">
        <button id="expand-image-button" type="button" onClick={expandImage}><i className="fas fa-expand" /></button>
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