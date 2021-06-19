import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Carousel({ style, photoIndex, clickHandler, expandedClicked }) {
  // 0 = initial, 1 = deexpanding, 2 = expanding, 3 = expanded
  const [expanded, setExpanded] = useState(0);
  const [leftHidden, setLeftHidden] = useState(false);
  const [rightHidden, setRightHidden] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomX, setZoomX] = useState(0);
  const [zoomY, setZoomY] = useState(0);

  const expandImageElement = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z"/>
    </svg>
  );

  let mainImage;
  let imageSource;
  let moveExpand = {
    transform: 'none',
  };

  if (!photoIndex) {
    imageSource = style.photos[0].url;
  } else {
    imageSource = style.photos[photoIndex].url;
  }

  function convertPercentForTransform(input) {
    return ((input * 0.5 - 25) * -1);
  }

  function toggleZoom(event) {
    if (zoomed) {
      setZoomed(false);
    } else {
      let calcX = Math.floor((event.nativeEvent.offsetX / event.target.width) * 100);
      let calcY = Math.floor((event.nativeEvent.offsetY / event.target.height) * 100);
      calcX = convertPercentForTransform(calcX);
      calcY = convertPercentForTransform(calcY);
      setZoomX(calcX);
      setZoomY(calcY);
      setZoomed(true);
    }
  }

  function expandImage() {
    if (zoomed) {
      toggleZoom();
    }
    if (expanded < 2) {
      setExpanded(2);
      setTimeout(() => { setExpanded(3); }, 450);
      expandedClicked();
    } else {
      setExpanded(1);
      setTimeout(() => { setExpanded(0); }, 450);
      expandedClicked();
    }
  }

  const overlayStyle = {
    transform: `scale(2) translateX(${zoomX}%) translateY(${zoomY}%)`,
  };

  const imgStyle = {
    animationPlayState: 'running',
  };

  const overlayZoomed = !zoomed;

  if (expanded === 2) {
    moveExpand = {
      display: 'none',
      transform: 'none',
    };
    mainImage = <div style={imgStyle} className="expanding" id="main-image-container"><img hidden={zoomed} id="mainImage" alt="hi" src={imageSource} /></div>;
  } else if (expanded === 1) {
    moveExpand = {
      display: 'none',
      transform: 'none',
    };
    mainImage = <div style={imgStyle} className="deexpanding" id="main-image-container"><img id="mainImage" hidden={zoomed} alt="hi" src={imageSource} /></div>;
  } else if (expanded === 3) {
    moveExpand = {
      transform: 'translateX(450%)',
    };
    mainImage = (
      <div style={imgStyle} className="expanded" id="main-image-container">
        <img id="mainImage" onClick={toggleZoom} hidden={zoomed} alt="click to zoom" src={imageSource} />
        <img id="main-image-overlay" onClick={toggleZoom} hidden={overlayZoomed} style={overlayStyle} src={imageSource} alt="click to zoom out" />
      </div>
    );
  } else {
    mainImage = <div id="main-image-container"><img id="mainImage" hidden={zoomed} alt="hi" src={imageSource} /></div>;
  }

  useEffect(() => {
    if ((photoIndex === 0) || (expanded > 0)) {
      setLeftHidden(true);
    } else {
      setLeftHidden(false);
    }

    if ((photoIndex === style.photos.length - 1) || expanded > 0) {
      setRightHidden(true);
    } else {
      setRightHidden(false);
    }
  }, [photoIndex, expanded]);

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
        {mainImage}
        <div id="carousel-shevron-right" className="carousel-shevron-container">
          <button id="c-right" className="carousel-shevrons" hidden={rightHidden} type="button" onClick={(e) => clickHandler('right')}>
            {shevron}
          </button>
        </div>
      </div>
      <div id="expand-image-container" style={moveExpand}>
        <button id="expand-image-button" type="button" onClick={expandImage}>
          {expandImageElement}
        </button>
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