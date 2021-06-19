import React, { useState, useEffect } from 'react';

const ComponentRatingBreakdown = ({ reviewMeta }) => {
  const [fit, setFit] = useState('0%');
  const [length, setLength] = useState('0%');
  const [quality, setQuality] = useState('0%');
  const [comfort, setComfort] = useState('0%');
  const [width, setWidth] = useState('0%');
  const [size, setSize] = useState('0%');

  const calculatePercentagesForCharacteristics = () => {
    const convertToPercentage = (num) => {
      let number = parseFloat(num);
      number /= 5;
      if (number !== 0) {
        number -= 0.05;
      }
      number = number.toString();
      if (number.length === 3) {
        number = number.concat('0');
      }
      number = number.slice(2, 4);
      number = number.concat('%');

      return number;
    };

    if (reviewMeta && reviewMeta.characteristics) {
      if (reviewMeta.characteristics.Width) {
        const tempWidth = convertToPercentage(reviewMeta.characteristics.Width.value);
        setWidth(tempWidth);
      }
      if (reviewMeta.characteristics.Length) {
        const tempLength = convertToPercentage(reviewMeta.characteristics.Length.value);
        setLength(tempLength);
      }
      if (reviewMeta.characteristics.Comfort) {
        const tempComfort = convertToPercentage(reviewMeta.characteristics.Comfort.value);
        setComfort(tempComfort);
      }
      if (reviewMeta.characteristics.Quality) {
        const tempQuality = convertToPercentage(reviewMeta.characteristics.Quality.value);
        setQuality(tempQuality);
      }
      if (reviewMeta.characteristics.Fit) {
        const tempFit = convertToPercentage(reviewMeta.characteristics.Fit.value);
        setFit(tempFit);
      }
      if (reviewMeta.characteristics.Size) {
        const tempSize = convertToPercentage(reviewMeta.characteristics.Size.value);
        setSize(tempSize);
      }
    }
  };

  useEffect(() => { calculatePercentagesForCharacteristics(); }, [reviewMeta, reviewMeta.characteristics]);

  return (
    <div className="subcomponent-breakdown-container">
      {reviewMeta.characteristics.Size
        ? (
          <div className="componentTypeHolder">
            <div className="componentTitle">Size</div>
            <div className="breakdownPercentageHolder">
              <div className="breakdownPercentage" style={{ left: size }}><i className="fa fa-caret-down" aria-hidden="true" /></div>
            </div>
            <div className="componentBreakdownHolder">
              <div className="tooSmall">Too Small</div>
              <div className="perfectFit">Perfect Size</div>
              <div className="tooBig">Too Big</div>
            </div>

          </div>
        ) : null}
      {reviewMeta.characteristics.Fit
        ? (
          <div className="componentTypeHolder">
            <div className="componentTitle">Fit</div>
            <div className="breakdownPercentageHolder">
              <div className="breakdownPercentage" style={{ left: fit }}><i className="fa fa-caret-down" aria-hidden="true" /></div>
            </div>
            <div className="componentBreakdownHolder">
              <div className="tooSmall">Too Tight</div>
              <div className="perfectFit">Perfect Fit</div>
              <div className="tooBig">Too Loose</div>
            </div>

          </div>
        ) : null}

      {reviewMeta.characteristics.Quality
        ? (
          <div className="componentTypeHolder">
            <div className="componentTitle">Quality</div>
            <div className="breakdownPercentageHolder">
              <div className="breakdownPercentage" style={{ left: quality }}><i className="fa fa-caret-down" aria-hidden="true" /></div>
            </div>
            <div className="componentBreakdownHolder">
              <div className="tooSmall">Poor Quality</div>
              <div className="perfectFit">Middle</div>
              <div className="tooBig">High Quality</div>
            </div>

          </div>
        ) : null}
      {reviewMeta.characteristics.Width
        ? (
          <div className="componentTypeHolder">
            <div className="componentTitle">Width</div>
            <div className="breakdownPercentageHolder">
              <div className="breakdownPercentage" style={{ left: width }}><i className="fa fa-caret-down" aria-hidden="true" /></div>
            </div>
            <div className="componentBreakdownHolder">
              <div className="tooSmall">Too Narrow</div>
              <div className="perfectFit">Perfect</div>
              <div className="tooBig">Too Wide</div>
            </div>
          </div>
        ) : null}
      {reviewMeta.characteristics.Length
        ? (
          <div className="componentTypeHolder">
            <div className="componentTitle">Length</div>
            <div className="breakdownPercentageHolder">
              <div className="breakdownPercentage" style={{ left: length }}><i className="fa fa-caret-down" aria-hidden="true" /></div>
            </div>
            <div className="componentBreakdownHolder">
              <div className="tooSmall">Too Short</div>
              <div className="perfectFit">Perfect</div>
              <div className="tooBig">Too Too Long</div>
            </div>
          </div>
        ) : null}
      {reviewMeta.characteristics.Comfort
        ? (
          <div className="componentTypeHolder">
            <div className="componentTitle">Comfort</div>
            <div className="breakdownPercentageHolder">
              <div className="breakdownPercentage" style={{ left: comfort }}><i className="fa fa-caret-down" aria-hidden="true" /></div>
            </div>
            <div className="componentBreakdownHolder">
              <div className="tooSmall">Very Uncomfortable</div>
              <div className="perfectFit">Average</div>
              <div className="tooBig">Super Comfortable</div>
            </div>

          </div>
        ) : null}

    </div>
  );
};

export default ComponentRatingBreakdown;
