const baseConfig = require('../../clean-package.config.cjs');

delete baseConfig.replace.exports['./src/main.ts'];

module.exports = baseConfig;
