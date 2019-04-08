const path = require('path');
const fs = require('fs');

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
    default: 'http://localhost:3001',
    env: 'CORS_ORIGIN'
  },
  session: {
    secretKey: {
      doc: 'Session secret key.',
      format: String,
      default: 'werwer%^%$^%asdasd',
      env: 'SESSION_SECRET_KEY'
    },
  },
  db: {
    mongo: {
      url: {
        doc: 'MongoDB url connect address.',
        format: String,
        default: 'mongodb+srv://db-user:FimR9fCwLSFoTYhS@cluster0-dwp8a.mongodb.net/48Ukraine?retryWrites=true',
        env: 'DB_MONGO_URL',
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
      default: 'fgh$lkDS345',
      env: 'MAIL_PASS',
      sensitive: true
    },
  },
  jwt: {
    privateKey: {
      doc: 'JWT private key.',
      format: String,
      default: '-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBAIJ9QzeBTYUdjw80EbVIktLWrfqGcVUyHlNsK0ihDTpXrX9OpKcB\nXIr7xBWp/orhEmY35YpuybCc+y9LDKq+/b8CAwEAAQJAAo9+sCojYUdRNVUqO8pu\nxyBbTZ0xwCA5pB1tRAGVBt4GXahHs25kb5eFwHKtdBR9bTwT5brVVqI0ntUMf+kD\n8QIhAMpunYD9ZWEPQn27m9ADw+EeFrGFLP0c6Czcki31+CnVAiEApQUEeh1ymleA\neOuv1/thXx84d73YeqrjiT1J7HMuX0MCICjOcYueCQCuzc2AsyEUkTjhEtwIJ5CC\ncj8Q25rOOY9dAiB6TMSrqEV2Y+FgPPS+8pyQvffArt/Q0fP+k4DFD/xPNwIhAIZW\nWAEdujgNNz3Yv1EB1inSEmfERcUiCPSLi5cUhAuf\n-----END RSA PRIVATE KEY-----',
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
