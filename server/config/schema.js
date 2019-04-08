const path = require('path');
const fs = require('fs');
const { checkRequired } = require('../lib/env-params');

const params = ['DB_MONGO_URL', 'DB_MONGO_URL_TEST', 'SESSION_SECRET_KEY', 'MAIL_PASS', 'JWT_PRIVATE_KEY'];
checkRequired(params);


module.exports = {
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env'
  },
  server: {
    host: {
      doc: 'Host address of the server.',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 5001,
      env: 'PORT'
    }
  },
  corsOrigin: {
    doc: 'CORS origin comma separated addresses.',
    format: String,
    default: 'http://127.0.0.1:3001',
    env: 'CORS_ORIGIN'
  },
  session: {
    secretKey: {
      doc: 'Session secret key.',
      format: String,
      default: process.env.SESSION_SECRET_KEY,
      env: 'SESSION_SECRET_KEY',
      sensitive: true
    },
  },
  db: {
    mongo: {
      url: {
        doc: 'MongoDB url connect address.',
        format: String,
        default: process.env.DB_MONGO_URL,
        env: 'DB_MONGO_URL',
      },
      test: {
        url: {
          doc: 'MongoDB url connect address for testing.',
          format: String,
          default: process.env.DB_MONGO_URL_TEST,
          env: 'DB_MONGO_URL_TEST',
        }
      }
    }
  },
  mail: {
    host: {
      doc: 'Mail SMTP host name.',
      format: '*',
      default: 'smtp.gmail.com',
      env: 'MAIL_HOST'
    },
    port: {
      doc: 'Mail port number.',
      format: 'port',
      default: 587,
      env: 'MAIL_PORT'
    },
    user: {
      doc: 'Mail user.',
      format: 'email',
      default: 'update.48ukraine.com@gmail.com',
      env: 'MAIL_USER'
    },
    pass: {
      doc: 'Mail password.',
      format: String,
      default: process.env.MAIL_PASS,
      env: 'MAIL_PASS',
      sensitive: true
    },
  },
  jwt: {
    privateKey: {
      doc: 'JWT private key.',
      format: String,
      default: process.env.JWT_PRIVATE_KEY,
      env: 'JWT_PRIVATE_KEY',
      sensitive: true
    },
    publicKeyFile: {
      doc: 'JWT public key file.',
      format: value => fs.existsSync(path.resolve(__dirname, '../', value)),
      default: 'lib/jwt/public.key'
    },
  },
  app: {
    dataUrl: {
      doc: 'Data url for fetching real data. ',
      format: 'url',
      default: 'https://48ukraine.com',
      env: 'DATA_SERVER_URL'
    },
    httpName: {
      doc: 'HTTP server name for the current site. ',
      format: 'url',
      default: 'https://js1-48ukraine.herokuapp.com',
      env: 'HTTP_NAME'
    },
    mailFrom: {
      doc: 'Mail from for auto messaging.',
      format: 'email',
      default: 'update.48ukraine.com@gmail.com',
      env: 'MAIL_FROM'
    },
  },
};
