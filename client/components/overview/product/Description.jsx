import React from 'react';

function Description({ slogan, text }) {
  return (
    <div>
      <h3>{slogan}</h3>
      <p>{text}</p>
    </div>
  );
}

export default Description;
