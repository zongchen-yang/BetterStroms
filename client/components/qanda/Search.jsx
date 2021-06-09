import React,{ useState, useEffect} from 'react';

const Search = (props) => {
  let [inputText, changeInputText] = useState('');

  const onInputChange = (event) => {
    changeInputText(event.target.value);
    // console.log(inputText)
  };

  return (
    <div className="search-bar">
      <input
        placeholder="search"
        onChange={(e) => props.search(e.target.value)}
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
