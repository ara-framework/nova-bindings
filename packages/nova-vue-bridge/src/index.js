
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
  data() {
    return {
      innerHTML: this.placeholder,
    };
  },
  render: function render(h) {
    if (this.innerHTML) {
      return h('div', { domProps: { innerHTML: this.innerHTML } });
    }

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
  methods: {
    emitNovaMount() {
      const id = this.$el.querySelector('div[data-hypernova-id]').getAttribute('data-hypernova-id');
      const customEvent = new CustomEvent('NovaMount', { detail: { id, name: this.name } });

      document.dispatchEvent(customEvent);
    },
  },
  beforeMount() {
    if (this.$el) {
      this.innerHTML = this.$el.innerHTML;
    }
  },
  mounted() {
    this.emitNovaMount();
  },
  updated() {
    this.$nextTick(() => {
      this.emitNovaMount();
    });
  },
};
