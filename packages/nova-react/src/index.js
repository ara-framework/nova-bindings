import React from 'react';
import ReactDOM from 'react-dom';
import { findNode, getData } from 'nova-helpers';

export { renderReact, renderReactStatic } from 'hypernova-react';

export { load } from 'hypernova';

export const loadById = (name, id) => {
  const node = findNode(name, id);
  const data = getData(name, id);

  if (node && data) {
    return {
      node,
      data,
    };
  }

  return null;
};

export const mountComponent = (component, node, data) => {
  const element = React.createElement(component, data);

  if (node.innerHTML && ReactDOM.hydrate) {
    ReactDOM.hydrate(element, node);
  }

  return ReactDOM.render(element, node);
};

export const renderInPlaceholder = (name, component, id) => {
  const node = findNode(name, id);
  const data = getData(name, id);

  if (node && data) {
    mountComponent(component, node, data);
  }
};
