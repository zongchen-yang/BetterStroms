const reviewFilter = [1];

const displayFiltersUsed = () => {
  if (reviewFilter.length === 0) {
    return null;
  }
  let reviewList = '';
  // const result = `Showing only ${reviewList}star reviews.`;
  for (let i = 0; i < reviewFilter.length; i++) {
    reviewList = reviewList.concat(`${reviewFilter[i].toString()} `);
    console.log(reviewList);
  }
  if (reviewList.length > 2) {
    const tail = reviewList.slice(reviewList.length - 2, reviewList.length);
    console.log('tail:', tail);
    const head = reviewList.slice(0, reviewList.length - 2);
    console.log('head:', head);
    reviewList = `${head}& ${tail}`;
    console.log(reviewList);
  }
  return `Showing only ${reviewList}star reviews.`;
};

const str = displayFiltersUsed();

console.log(str);
