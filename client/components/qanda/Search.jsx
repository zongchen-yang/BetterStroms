import React,{ useState, useEffect} from 'react';

const Search = (props) => {
  let [inputText, changeInputText] = useState('');

  const onInputChange = (event) => {
    changeInputText(event.target.value);
    // console.log(inputText)
  };

  return (
    <div>
      <input onChange={onInputChange} />
      <button type="button" onClick={() => props.search(inputText)}>Search</button>
    </div>
  );
};

export default Search;
