import React from 'react';

const withClickTrackingEventHandler = (Component) => {
  const handleClickTracking = (element, widget, time) => {
    axios.post(`/interactions`, {
      element, // 'string', //required: Selector for the element which was clicked
      widget, //'sting',   //required: Name of the module/widget in which the click occured
      time //'string'     //required: Time the interaction occured (timestamp)
    });
  };

  const decoratedWithClickTrackingComponent = () => (
    <div onClick={(event) => handleClickTracking(event.target, parent, Date.now())}>
      <Component />
    </div>
  );

  return decoratedWithClickTrackingComponent;
};

export default withClickTrackingEventHandler;

// module.exports = WithClickTrackingEventHandler;
