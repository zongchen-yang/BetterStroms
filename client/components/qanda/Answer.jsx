import React, { useState, useEffect } from 'react';

const Answer = (props) => {
  const { answerer_name, body, helpfulness, id, photos} = props.answer
  return(
  <div>
    <div> An Answer </div>
    <div>User: {answerer_name}</div>
    <div>Body: {body}</div>
    <div onClick={() => props.updateAnswersHelpfulness(id)}>Helpful? {helpfulness}</div>
    {photos.map((url, idx) => (
      <img src={url} key={id + idx} width="75" height="75" alt="" />
    ))}
  </div>

  )
}

export default Answer;
// style="width: 100px;height:100px;"