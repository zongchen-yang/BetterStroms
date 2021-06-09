import React, { useState, useEffect } from 'react';

const Answer = (props) => {
  const {answer, updateAnswersHelpfulness, reportAnswer} = props;
  const { answerer_name, body, helpfulness, id, photos} = answer;
  let [helpfulCount, setHelpfulCount] = useState(helpfulness);
  const [isHelpful, setIsHelpful] = useState(false);


  const updateHelpfulCount = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount += 1);
      updateAnswersHelpfulness(id);
    }
  }

  return(
  <div>
    <div> An Answer </div>
    <div>
      User: {answerer_name}
    </div>
    <div>
      Body: {body}
    </div>
    <div onClick={() => updateHelpfulCount()} role="button">
      Helpful? {helpfulCount}
    </div>
    {photos.map((url, idx) => (
      <img src={url} key={id + idx} width="75" height="75" alt="" />
    ))}
    <div onDoubleClick={() => reportAnswer(id)}>Report</div>
  </div>

  )
}

export default Answer;
// style="width: 100px;height:100px;"