import React,{ useState, useEffect} from 'react';

const Search = ({search}) => {
  let [inputText, changeInputText] = useState('');

  const onInputChange = (event) => {
    changeInputText(event.target.value);
    search(inputText);
  };

  return (
    <div className="search-bar">
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
    </div>
  );
};

export default Search;
