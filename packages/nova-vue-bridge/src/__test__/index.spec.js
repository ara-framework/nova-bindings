import Vue from 'vue';

import Nova from '..';

jest.mock('uuid/v4', () => () => 'uuid');

describe('nova-vue-bridge', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  test('should render placeholder correctly', () => {
    const Component = Vue.extend(Nova);

    const vm = new Component({
      propsData: {
        name: 'Example',
        data: {
          title: 'Nova Bridge',
        },
      },
    });

    vm.$mount(document.getElementById('app'));

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  test('should render placeholder when is updated', async () => {
    const Component = Vue.extend(Nova);

    const vm = new Component({
      propsData: {
        name: 'Example',
        data: {
          title: 'Nova Bridge',
        },
      },
    });

    vm.$mount(document.getElementById('app'));

    await new Promise((resolve) => {
      vm.$nextTick(() => {
        resolve();
      });
      vm.data = { title: 'Nova Bridge Updated' };
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  test('should emit event when placeholder is mounted', async () => {
    const Component = Vue.extend(Nova);

    const vm = new Component({
      propsData: {
        name: 'Example',
        data: {
          title: 'Nova Bridge',
        },
      },
    });

    const event = await new Promise((resolve) => {
      document.addEventListener('NovaMount', (evt) => {
        resolve(evt);
      });

      vm.$mount(document.getElementById('app'));
    });

    expect(event.detail).toMatchSnapshot();
  });

  test('should emit event when placeholder is updated', async () => {
    const Component = Vue.extend(Nova);

    const vm = new Component({
      propsData: {
        name: 'Example',
        data: {
          title: 'Nova Bridge',
        },
      },
    });

    const event = await new Promise((resolve) => {
      vm.$mount(document.getElementById('app'));

      document.addEventListener('NovaMount', (evt) => {
        resolve(evt);
      });

      vm.data = { title: 'Nova Bridge Updated' };
    });

    expect(event.detail).toMatchSnapshot();
  });
});
