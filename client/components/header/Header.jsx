import React from 'react';
import ClickTracking from '../../WithClickTrackingEventHandler';

function Header() {
  return (
    <ClickTracking module="Header">
      <div id="main-header-container">
        <span id="main-header" className="big-header">
          BetterStroms
        </span>
        <span id="header-searchbar">
          <input id="header-inputbar" />
          <button className="social-media-buttons" id="search-button" type="button">
            <img src="./assets/magnifying_glass.svg" alt="" />
          </button>
        </span>
      </div>
    </ClickTracking>
  );
}

export default Header;
