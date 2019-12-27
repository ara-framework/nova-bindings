import { fromScript } from 'hypernova';

export const DATA_KEY = 'hypernova-key';
export const DATA_ID = 'hypernova-id';

const { document } = global;

export const findNode = (name, id) => {
  const key = name.replace(/\W/g, '');

  return document.querySelector(`div[data-${DATA_KEY}="${String(key)}"][data-${DATA_ID}="${String(id)}"]`);
};

export const getData = (name, id) => {
  const key = name.replace(/\W/g, '');

  return fromScript({
    [DATA_KEY]: key,
    [DATA_ID]: id,
  });
};

export const loadScript = (src) => new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) {
    resolve();

    return;
  }

  const el = document.createElement('script');

  el.type = 'text/javascript';
  el.async = true;
  el.src = src;

  el.addEventListener('load', resolve);
  el.addEventListener('error', reject);
  el.addEventListener('abort', reject);

  document.head.appendChild(el);
});
