import React from 'react';

const RenderStars = ({ rating }) => {
  const whole = Math.floor(rating);
  const partNum = (rating - Math.floor(rating));
  const partStr = partNum.toString().slice(2, 4).concat('%');

  return (
    <div>
      <div className="review-shownRating">
        {[...Array(whole)].map((each, i) => <div key={i}><i className="fas fa-star" /></div>)}
        {partNum ? <div><i className="fas fa-star" style={{ width: partStr, overflow: 'hidden' }} /></div> : null}
        <div className="review-hiddenRating">
          {[...Array(5)].map((each, i) => <i className="far fa-star" key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default RenderStars;

// const RenderStars = (props) => {
//   const { overallRating } = props;
//   const wholeStars = (overallRating) => {
//     let result = [];
//     for (let i = 0; i < Math.floor(overallRating); i++) {
//       result.push(<div><i className="fas fa-star" /></div>);
//     }
//     result.push(<div>
//       <i
//         className="fas fa-star"
//         style={{ width: (overallRating - Math.floor(overallRating)), overflow: 'hidden' }}
//       />
//                 </div>);
//     return result;
//   };

//   return (
//     <div>
//       <div className="shownRating">
//         {wholeStars}
//       </div>
//       <div className="hiddenRating">
//         {[...Array(5)].map(() => <i className="far fa-star" />)}
//       </div>
//     </div>
//   );
// };

// export default RenderStars;
