import React, { useState } from 'react';

const CharacteristicRadioButtons = (props) => {
  const { reviewMeta } = props;
  const { characteristicRadioHandler } = props;

  return (
    <form>

      {reviewMeta.characteristics.Size
        ? (
          <div className="review-characteristic-supercontainer">
            <div className="review-characteristic-label">Size</div>
            <div className="characterstic-radio-container">
              <input
                className="radio-selection"
                type="radio"
                name="size"
                value="A size too small"
                id="1-size"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Size.id); }}
              />
              <label htmlFor="1-size">A size too small</label>

              <input
                className="radio-selection"
                type="radio"
                name="size"
                value="1/2 a size too small"
                id="2-size"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Size.id);
                }}
              />
              <label htmlFor="2-size">1/2 a size too small</label>

              <input
                className="radio-selection"
                type="radio"
                name="size"
                value="Perfect"
                id="3-size"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Size.id);
                }}
              />
              <label htmlFor="3-size">Perfect</label>

              <input
                className="radio-selection"
                type="radio"
                name="size"
                value="1/2 a size too big"
                id="4-size"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Size.id);
                }}
              />
              <label htmlFor="4-size">1/2 a size too big</label>

              <input
                className="radio-selection"
                type="radio"
                name="size"
                value="A size too wide"
                id="5-size"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Size.id);
                }}
              />
              <label htmlFor="5-size">A size too wide</label>
            </div>
          </div>
        )
        : null}
      {reviewMeta.characteristics.Width
        ? (
          <div className="review-characteristic-supercontainer">
            <div className="review-characteristic-label">Width</div>
            <div className="characterstic-radio-container">
              <input
                className="radio-selection"
                type="radio"
                name="Width"
                value="Too narrow"
                id="1-width"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Width.id);
                }}
              />
              <label htmlFor="1-width">Too narrow</label>

              <input
                className="radio-selection"
                type="radio"
                name="Width"
                value="Slightly narrow"
                id="2-width"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Width.id);
                }}
              />
              <label htmlFor="2-width">Slightly narrow</label>

              <input
                className="radio-selection"
                type="radio"
                name="Width"
                value="Perfect"
                id="3-width"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Width.id);
                }}
              />
              <label htmlFor="3-width">Perfect</label>

              <input
                className="radio-selection"
                type="radio"
                name="Width"
                value="Slightly wide"
                id="4-width"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Width.id);
                }}
              />
              <label htmlFor="4-width">Slightly Wide</label>

              <input
                className="radio-selection"
                type="radio"
                name="Width"
                value="Too wide"
                id="5-width"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Width.id);
                }}
              />
              <label htmlFor="5-width">Too wide</label>
            </div>
          </div>
        )
        : null}

      {reviewMeta.characteristics.Comfort
        ? (
          <div className="review-characteristic-supercontainer">
            <div className="review-characteristic-label">Comfort</div>
            <div className="characterstic-radio-container">
              <input
                className="radio-selection"
                type="radio"
                name="comfort"
                value="Uncomfortable"
                id="1-comfort"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Comfort.id);
                }}
              />
              <label htmlFor="1-comfort">Uncomfortable</label>

              <input
                className="radio-selection"
                type="radio"
                name="comfort"
                value="Slightly uncomfortable"
                id="2-comfort"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Comfort.id);
                }}
              />
              <label htmlFor="2-comfort">Slightly uncomfortable</label>

              <input
                className="radio-selection"
                type="radio"
                name="comfort"
                value="Ok"
                id="3-comfort"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Comfort.id);
                }}
              />
              <label htmlFor="3-comfort">Ok</label>

              <input
                className="radio-selection"
                type="radio"
                name="comfort"
                value="Comfortable"
                id="4-comfort"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Comfort.id);
                }}
              />
              <label htmlFor="4-comfort">Comfortable</label>

              <input
                className="radio-selection"
                type="radio"
                name="comfort"
                value="Comfortable"
                id="5-comfort"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Comfort.id);
                }}
              />
              <label htmlFor="5-comfort">Comfortable</label>
            </div>
          </div>
        )
        : null}
      {reviewMeta.characteristics.Quality
        ? (
          <div className="review-characteristic-supercontainer">
            <div className="review-characteristic-label">Quality</div>
            <div className="characterstic-radio-container">
              <input
                className="radio-selection"
                type="radio"
                name="quality"
                value="Poor"
                id="1-quality"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Quality.id); }}
              />
              <label htmlFor="1-quality">Poor</label>

              <input
                className="radio-selection"
                type="radio"
                name="quality"
                value="Below average"
                id="2-quality"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Quality.id); }}
              />
              <label htmlFor="2-quality">Below average</label>

              <input
                className="radio-selection"
                type="radio"
                name="quality"
                value="What I expected"
                id="3-quality"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Quality.id); }}
              />
              <label htmlFor="3-quality">What I expected</label>

              <input
                className="radio-selection"
                type="radio"
                name="quality"
                value="Pretty great"
                id="4-quality"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Quality.id); }}
              />
              <label htmlFor="4-quality">Pretty great</label>

              <input
                className="radio-selection"
                type="radio"
                name="quality"
                value="Perfect"
                id="5-quality"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Quality.id); }}
              />
              <label htmlFor="5-quality">Perfect</label>
            </div>
          </div>
        )
        : null}

      {reviewMeta.characteristics.Length
        ? (
          <div className="review-characteristic-supercontainer">
            <div className="review-characteristic-label">Length</div>
            <div className="characterstic-radio-container">
              <input
                className="radio-selection"
                type="radio"
                name="Length"
                value="Runs Short"
                id="1-length"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Length.id);
                }}
              />
              <label htmlFor="1-length">Runs Short</label>

              <input
                className="radio-selection"
                type="radio"
                name="Length"
                value="Runs slightly short"
                id="2-length"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Length.id);
                }}
              />
              <label htmlFor="2-length">Runs slightly short</label>

              <input
                className="radio-selection"
                type="radio"
                name="Length"
                value="Perfect"
                id="3-length"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Length.id);
                }}
              />
              <label htmlFor="3-length">Perfect</label>

              <input
                className="radio-selection"
                type="radio"
                name="Length"
                value="Runs slightly long"
                id="4-length"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Length.id);
                }}
              />
              <label htmlFor="4-length">Runs slightly long</label>

              <input
                className="radio-selection"
                type="radio"
                name="Length"
                value="Runs long"
                id="5-length"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Length.id);
                }}
              />
              <label htmlFor="5-length">Runs long</label>
            </div>
          </div>
        )
        : null}
      {reviewMeta.characteristics.Fit
        ? (
          <div className="review-characteristic-supercontainer">
            <div className="review-characteristic-label">Fit</div>
            <div className="characterstic-radio-container">
              <input
                className="radio-selection"
                type="radio"
                name="fit"
                value="Runs tight"
                id="1-fit"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Fit.id); }}
              />
              <label htmlFor="1-fit">Runs tight</label>

              <input
                className="radio-selection"
                type="radio"
                name="fit"
                value="Runs slightly tight"
                id="2-fit"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Fit.id); }}
              />
              <label htmlFor="2-fit">Runs slightly tight</label>

              <input
                className="radio-selection"
                type="radio"
                name="fit"
                value="Perfect"
                id="3-fit"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Fit.id); }}
              />
              <label htmlFor="3-fit">Perfect</label>

              <input
                className="radio-selection"
                type="radio"
                name="fit"
                value="Runs slightly long"
                id="4-fit"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Fit.id); }}
              />
              <label htmlFor="4-fit">Runs slightly long</label>

              <input
                className="radio-selection"
                type="radio"
                name="fit"
                value="Runs long"
                id="5-fit"
                onClick={(e) => {
                  characteristicRadioHandler(e, reviewMeta.characteristics.Fit.id); }}
              />
              <label htmlFor="5-fit">Runs long</label>
            </div>
          </div>
        )
        : null}
    </form>
  );
};

export default CharacteristicRadioButtons;
