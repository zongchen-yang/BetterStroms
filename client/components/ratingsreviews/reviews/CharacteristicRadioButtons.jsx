import React, { useState } from 'react';

const CharacteristicRadioButtons = (props) => {
  const { reviewMeta } = props;

  return (
    <form>
      {reviewMeta.characteristics.Fit
        ? (
          <>
            <div>
              <input type="radio" id="yes" name="fit" value="yes" onClick={(e) => ((e))} checked />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="fit" value="no" onClick={(e) => ((e))} />
              <label htmlFor="no">No</label>
            </div>
          </>
        )
        : null}
      {reviewMeta.characteristics.Size
        ? (
          <>
          <div className="review-characteristic-label">Size</div>
            <input className="radio-selection" type="radio" name="size" id="one" value="A size too small" />
            <label htmlFor="one">A size too small</label>

            <input className="radio-selection" type="radio" name="size" id="two" value="1/2 a size too small" />
            <label htmlFor="two">1/2 a size too small</label>

            <input className="radio-selection" type="radio" name="size" id="three" value="Perfect" />
            <label htmlFor="three">Perfect</label>

            <input className="radio-selection" type="radio" name="size" id="four" value="1/2 a size too big" />
            <label htmlFor="four">1/2 a size too big</label>

            <input className="radio-selection" type="radio" name="size" id="five" value="A size too wide" />
            <label htmlFor="five">A size too wide</label>
          </>
        )
        : null}
      {reviewMeta.characteristics.Quality
        ? (
          <>
            <div>
              <input type="radio" id="yes" name="quality" value="yes" onClick={(e) => ((e))} checked />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="quality" value="no" onClick={(e) => ((e))} />
              <label htmlFor="no">No</label>
            </div>
          </>
        )
        : null}
      {reviewMeta.characteristics.Comfort
        ? (
          <>
            <div>
              <input type="radio" id="yes" name="recommend" value="yes" onClick={(e) => ((e))} checked />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="recommend" value="no" onClick={(e) => ((e))} />
              <label htmlFor="no">No</label>
            </div>
          </>
        )
        : null}
      {reviewMeta.characteristics.Length
        ? (
          <>
            <div>
              <input type="radio" id="yes" name="recommend" value="yes" onClick={(e) => ((e))} checked />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="recommend" value="no" onClick={(e) => ((e))} />
              <label htmlFor="no">No</label>
            </div>
          </>
        )
        : null}
      {reviewMeta.characteristics.Width
        ? (
          <>
            <div>
              <input type="radio" id="yes" name="recommend" value="yes" onClick={(e) => ((e))} checked />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="recommend" value="no" onClick={(e) => ((e))} />
              <label htmlFor="no">No</label>
            </div>
          </>
        )
        : null}
    </form>
  );
};

export default CharacteristicRadioButtons;
