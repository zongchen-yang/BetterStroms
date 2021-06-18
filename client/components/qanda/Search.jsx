import React from 'react';
import ClickTracking from '../../WithClickTrackingEventHandler';

const Search = ({search}) => (
  <div className="search-bar">
    <ClickTracking element="QandA search bar" module="QandA">
      <input
        className="question-search-bar-actual"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={(e) => {
          if (e.target.value.length > 2) {
            search(e.target.value);
          }
          if (e.target.value.length === 0) {
            search('');
          }
        }}
      />
    </ClickTracking>
  </div>
);

export default Search;

// const onInputChange = (event) => {
//   changeInputText(event.target.value);
//   search(inputText);
// };
