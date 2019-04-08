const config = require('../config');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

const url = config.get('env') === 'test'
  ? config.get('db.mongo.test.url')
  : config.get('db.mongo.url');

exports.connect = () => mongoose.connect( url, { useNewUrlParser: true, promiseLibrary: true } );
exports.disconnect = () => mongoose.connection.close();
