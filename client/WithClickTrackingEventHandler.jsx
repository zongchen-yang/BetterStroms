import React from 'react';

const WithClickTrackingEventHandler = (props) => {
  const handleClickTracking = (originalOnClick, child, event) => {
    const requestBody = {
      element: props.element,
      // 'string', //required: Selector for the element which was clicked
      widget: props.module,
      // 'sting',   //required: Name of the module in which the click occured
      time: new Date(),
      // 'string'     //required: Time the interaction occured (timestamp)
    };

    // axios.post(`/interactions`, requestBody);
    // originalOnClick();
    originalOnClick(event);
    console.log('this is the child', child);
    console.log('this is the element', requestBody.element);
    console.log('this is the module', requestBody.widget);
    console.log('this is the timestamp', requestBody.time);
    console.log('children', React.Children.toArray());
    console.log('TRACKING is working on this button', props.eventName);
  };

  // const decoratedWithClickTrackingComponent = () => (
  //   <div onClick={(event) => handleClickTracking(event.target, parent, Date.now())}>
  //     <Component />
  //   </div>
  // );

  // return decoratedWithClickTrackingComponent;
  return (
    React.Children.map(props.children, (child) => React.cloneElement(child, {
      onClick: handleClickTracking.bind(child, child.props.onClick, child),
    }))
  );
};

export default WithClickTrackingEventHandler;

// module.exports = WithClickTrackingEventHandler;
