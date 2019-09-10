const babelJest = require('babel-jest'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = babelJest.createTransformer({
  rootMode: 'upward',
});
