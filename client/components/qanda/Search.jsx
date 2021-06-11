import React,{ useState, useEffect} from 'react';

const Search = ({search}) => {
  let [inputText, changeInputText] = useState('');

  const onInputChange = (event) => {
    changeInputText(event.target.value);
    search(inputText);
    // console.log(inputText)
  };

  return (
    <div className="search-bar">
      <input
       className="question-search-bar-actual"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={(e) => search(e.target.value)}
        // onChange={onInputChange}
        // onChange={(e) => {
        //   if (e.target.value.length > 2) {
        //     props.search(e.target.value);
        //   }
        // }}
      />
      {/* <button type="button" onClick={() => props.search('')}>
        Refresh
      </button> */}
    </div>
  );
};

export default Search;
