# nova-react

Extends [hypernova-react](https://github.com/airbnb/hypernova-react) adding more features for [Ara Framework](https://github.com/ara-framework)

## Install

```sh
npm install nova-react
```

## Usage

You can use the methods that `hypernova-react` provides.

```js
import { renderReact } from 'nova-react';
import MyComponent from './src/MyComponent.jsx';

export default renderReact(
  'MyComponent.hypernova.js', // this file's name (or really any unique name)
  MyComponent,
);
```

### Render component in placeholder (Nova Directive)

`index.html`
```html
<div data-hypernova-key="Header" data-hypernova-id="afa6777f-e8bd-4201-ba42-fe56ec0523c3"></div>
  <script type="application/json" data-hypernova-key="Header" data-hypernova-id="afa6777f-e8bd-4201-ba42-fe56ec0523c3"><!--{"title":"React","links":[]}--></script>
```

`client.js`
```js
import { renderInPlaceholder } from 'nova-react';

import Header from './components/Header';

renderInPlaceholder('Header', Header, 'afa6777f-e8bd-4201-ba42-fe56ec0523c3');
```

### Mount Component

You can mount the component using the helper `mountComponent`.

- Component: React component to mount.
- node: HTMLElement where the component is mounted.
- data: Object with the data necessary to render the component (props).

```js
mountComponent(Component, node, data)
```