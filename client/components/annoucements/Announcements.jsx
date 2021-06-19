import React from 'react';

function Announcements() {
  return (
    <div id="announcement-container">
      <span className="announcement-text" id="announcement">
        20% better than nordstroms
      </span>
      <span className="announcement-break" />
      <span className="announcement-text" id="sale-discount">
        sale / discount
      </span>
      <span className="announcement-text" id="sale-offer">
        offer
      </span>
      <span className="announcement-break" />
      <span className="announcement-text" id="new-prod">
        new product highlight
      </span>
    </div>
  );
}

export default Announcements;
