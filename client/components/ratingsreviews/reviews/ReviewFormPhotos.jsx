import React from 'react';

const ReviewFormPhotos = (props) => {
  const { photo, key } = props;

  return (
    <>
      <img
        src={photo}
        alt="alt text"
        className="reviewPhotoThumbnail"
        id={key}
      />
    </>
  );
};

export default ReviewFormPhotos;
