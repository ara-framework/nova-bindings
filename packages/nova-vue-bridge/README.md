# Nova Vue Bridge

This package contains a Vue component named `Nova` that renders a placeholder also known as [Nova Directive](https://github.com/ara-framework/ara-cli/wiki)

Rendered placeholder:

```html
<div data-hypernova-key="NavBar" data-hypernova-id="d0a0b082-dad0-4bf2-ae4f-08eff16575b4"></div>
<script type="application/json" data-hypernova-key="NavBar" data-hypernova-id="d0a0b082-dad0-4bf2-ae4f-08eff16575b4"><!--{"brand":"Ara Framework","links":[{"url":"https://github.com/ara-framework","text":"Github"}]}--></script>

```

On **Client-Side Rendering** the placeholder is where the component is going to be mounted or hydrated depending of the framework or library.

On **Server-Side Rendering** the placeholder is used by [Nova Proxy](https://github.com/ara-framework/nova-proxy) or [Nova Static](https://github.com/ara-framework/nova-static) to Server-Side Include the html rendered by [Hypernova](https://github.com/airbnb/hypernova).

## Install

```
npm install nova-vue-bridge
```

## Usage

The `Nova` component requires the props `name` and `data`

- `name` is the registered view in Hypernova.
- `data` is the data necessary to render the view.

```vue
<template>
  <div class="container">
    <nova name="Example" :data="{ title: 'Ara Framework' }" />
  </div>
</template>

<script>
import Nova from 'nova-vue-bridge'

export default {
  components: {
    Nova
  },
}
</script>
```

### Mounting Hypernova Client Component

The `Nova` component emits an custom event called `NovaMount` on the `document` when the Vue component is mounted. The event needs to be listen by the Hypernova's client script in order to mount the view when the placeholders is ready.

```js
import { renderInPlaceholder } from 'hypernova-svelte'

import Example from './components/Example.svelte'

const { document } = global

document.addEventListener('NovaMount', (event) => {
  const { detail: { name, id } } = event
  if (name === 'Example') {
    return renderInPlaceholder(name, Example, id)
  }
})

```

The example above is using the method `renderInPlaceholder` from `hypernova-svelte`, this method should be available for the other supported [bindings](https://github.com/ara-framework/ara-cli/wiki/Supported-Hypernova-Bindings).
