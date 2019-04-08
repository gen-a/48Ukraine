const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('colors');

/**
 * Check required params in .env file
 * @param params
 */
exports.checkRequired = (params) => {
  const falied = [];
  params.forEach((name) => {
    if (!process.env[name]) {
      falied.push(name);
    }
  });
  if (falied.length) {
    console.log(`Required environment variable ${falied.join(', ')} is not set`.cyan);
    console.log('Please configure required environment variables to run the server'.bgRed);
    process.exit();
  }
};

/**
 * Break script if Node is not in test mode
 */
exports.exitIfNotTest = () => {
  console.log('run this script in NODE_ENV test mode only!'.red);
  process.exit();
};