import React from 'react';
import axios from 'axios';

const WithClickTrackingEventHandler = (props) => {
  const handleClickTracking = (originalOnClick, event) => {
    const element = {
      name: event.target.localName,
    };
    if (event.target.id) {
      element.id = event.target.id;
    } else {
      element.className = event.target.className;
    }

    const requestBody = {
      element: JSON.stringify(element),
      widget: props.module,
      time: new Date(),
    };

    axios.post(`/interactions`, requestBody)
      // .then((response) => console.log(response))
      .catch((error) => { throw error; });
    if (originalOnClick) {
      originalOnClick(event);
    }
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

// console.log('TRACKING is working on this button', props.element, props.module);
// console.log('this is the element', event.target);
// console.log('this is the element', event.target);
