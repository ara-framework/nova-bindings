import * as hypernovaReact from 'hypernova-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { findNode, getData } from 'nova-helpers';

const mountComponent = (component, node, data) => {
  const element = React.createElement(component, data);

  if (ReactDOM.hydrate) {
    ReactDOM.hydrate(element, node);
  } else {
    ReactDOM.render(element, node);
  }
};

const renderInPlaceholder = (name, component, id) => {
  const node = findNode(name, id);
  const data = getData(name, id);

  if (node && data) {
    mountComponent(component, node, data);
  }
};

module.exports = {
  ...hypernovaReact,
  renderInPlaceholder,
};
