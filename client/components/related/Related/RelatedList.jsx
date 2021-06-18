import React, { useState, useEffect, useCallback } from 'react';
import RelatedItem from './RelatedItem';
import Compare from './Compare';

const RelatedList = ({ related, product, displayItemCH }) => {
  const [showCompare, setShowCompare] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [window, setWindow] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  const getWindow = (related) => {
    if (related.length > 3) {
      setWindow(related.slice(0, 3));
    } else {
      setWindow(related);
    }
  };

  useEffect(() => {
    if (related) {
      getWindow(related);
      setPageReady(true);
    }
  }, [related]);

  const showCompareCH = (item) => {
    setSelectedItem(item);
    setShowCompare(true);
  };

  const rightCH = () => {
    const rightIndex = related.indexOf(window[2]);
    setWindow(related.slice(rightIndex - 1, rightIndex + 2));
  };

  const leftCH = () => {
    const leftIndex = related.indexOf(window[0]);
    setWindow(related.slice(leftIndex - 1, leftIndex + 2));
  };

  if (!pageReady) {
    return <p>loading...</p>;
  }

  const fourth = related.indexOf(window[2]) > -1 ? (related.indexOf(window[2]) + 1) : undefined;

  return (
    <div className="relatedList">
      <h3 className="title">RELATED PRODUCTS</h3>
      <div className="list">
        {window && window[0] && window[0].index !== 0 ? <i className="fas fa-chevron-left fa-2x" type="button" onClick={leftCH} /> : null}
        {window.map((each, i) => (
          <RelatedItem
            key={i}
            item={each}
            showCompareCH={showCompareCH}
            displayItemCH={displayItemCH}
          />
        ))}
        {related[fourth]
          ? (
            <RelatedItem
              item={related[fourth]}
              showCompareCH={showCompareCH}
              displayItemCH={displayItemCH}
              className={{ className: 'fourth' }}
            />
          ) : null}
        {window && window[2] && window[2].index !== related.length - 1 ? <i className="fas fa-chevron-right fa-2x" type="button" onClick={rightCH} /> : null}
      </div>
      {selectedItem && showCompare
        ? <Compare product={product} related={selectedItem} setShowCompare={setShowCompare} />
        : null}
    </div>
  );
};

export default RelatedList;
