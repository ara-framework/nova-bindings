
import { v4 } from 'uuid';

const { document, CustomEvent } = global;

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      default: () => v4(),
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  render: function render(h) {
    return h(
      'div',
      [
        h('div', {
          attrs: {
            'data-hypernova-key': this.name, 'data-hypernova-id': this.id,
          },
          domProps: {
            innerHTML: this.placeholder,
          },
        }),
        h('script', {
          attrs: {
            type: 'application/json',
            'data-hypernova-key': this.name,
            'data-hypernova-id': this.id,
          },
          domProps: {
            innerHTML: this.serialized,
          },
        }),
      ],
    );
  },
  computed: {
    serialized() {
      const dataStr = JSON.stringify(this.data);
      return `<!--${dataStr}-->`;
    },
  },
  beforeMount() {
    if (this.$el) {
      this.$el.innerHTML = '';
    }
  },
  mounted() {
    const id = this.$el.querySelector('div[data-hypernova-id]').getAttribute('data-hypernova-id');
    const customEvent = new CustomEvent('NovaMount', { detail: { id, name: this.name } });
    document.dispatchEvent(customEvent);
  },
};
