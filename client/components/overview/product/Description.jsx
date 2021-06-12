import React from 'react';

function Description({ slogan, text, feat }) {
  return (
    <div>
      <h3>{slogan}</h3>
      <p>{text}</p>
      <ul>
        {feat.map((item, index) => (
          <div key={index}>
            {item.feature} : {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Description;
