import React from 'react';

const withClickTracking = (Component) => {
  const onClick = (firstOnClick, event) => {
    fistOnClick(event);
    console.log('TRACKING ADDED TO CHILDREN WITH ONCLICK PROPS');
  };
  // if (Component.props.children) {
  //   for (const child of Component.props.children) {
  //     withClickTracking(child)
  //   }
  // }
  // if (Component.props.onClick) {
  //   return (
  //     React.cloneElement(Component, {
  //       onClick: onClick.bind(Component, Component.props.onClick),
  //     })
  //   );
  // }

  return (
    <Component>
      {React.Children.map(Component, (child) => React.cloneElement(child, {
        onClick: onClick.bind(child, child.props.onClick),
      }))}
    </Component>
  );
};

export default withClickTracking;

// if (React.Children.toArray(Component).length > 0) {
//   React.Children.forEach(props.children, (child) => {
//     withClickTracking(child);
//   });
// }
// if (Component.props.onClick) {
//   return (
//     React.cloneElement(Component, {
//       onClick: onClick.bind(Component, Component.props.onClick),
//     })
//   );
// }
