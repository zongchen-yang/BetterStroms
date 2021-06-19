import React from 'react';
import axios from 'axios';

const WithClickTrackingEventHandler = (props) => {
  const handleClickTracking = (originalOnClick, event) => {
    const requestBody = {
      element: props.element,
      // 'string', //required: Selector for the element which was clicked
      widget: props.module,
      // 'sting',   //required: Name of the module in which the click occured
      time: new Date(),
      // 'string'     //required: Time the interaction occured (timestamp)
    };

    axios.post(`/interactions`, requestBody)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    // originalOnClick();
    if (originalOnClick) {
      originalOnClick(event);
    }
    // console.log('TRACKING is working on this button', props.element, props.module);
  };

  return (
    React.Children.map(props.children, (child) => React.cloneElement(child, {
      onClick: handleClickTracking.bind(child, child.props.onClick),
    }))
  );
};

export default WithClickTrackingEventHandler;

// module.exports = WithClickTrackingEventHandler;

// const decoratedWithClickTrackingComponent = () => (
//   <div onClick={(event) => handleClickTracking(event.target, parent, Date.now())}>
//     <Component />
//   </div>
// );

// return decoratedWithClickTrackingComponent;
