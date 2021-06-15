import React, { useState } from 'react';
// import PhotoModal from 'react'

const ReviewPhoto = (props) => {
  const [showModal, changeShowModal] = useState(false);
  const { photo, key } = props;

  const photoClickHandler = (e) => {
    changeShowModal(!showModal);
  };

  return (
    <>
      <img src={photo.url} alt="alt text" className="reviewPhotoThumbnail"
      id={key} onClick={(e) => photoClickHandler(e)} />
      {showModal && (
      <img className="reviewPhotoFullsize" src={photo.url} onClick={photoClickHandler} alt="no image" />
      )}
    </>
  );
};

export default ReviewPhoto;

{ /* <PhotoModal show={showModal} handleClose={this.hideModal} /> */ }
