require('./config/env');
require('./config/passport');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');

const passport = require('passport');
const FileStore = require('session-file-store')(session);
const path = require('path');
const flash = require('connect-flash');

const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
const appRoutes = require('./routes/app-routes');
const productsRoutes = require('./routes/products-routes');
const ordersRoutes = require('./routes/orders-routes');

const app = express();
const PORT = process.env.PORT || 5000;

const { connect } = require('./config/mongoose');

process.on('unhandledRejection', () => {
});

// middlewares //
if(process.env.CORS_ORIGIN.length > 0){
  app.use(cors({
    origin: [process.env.CORS_ORIGIN.split(',')],
    methods: ['POST', 'PUT'],
    credentials: true // enable set cookie
  }));
}

app.use(morgan('combined'));
app.use(flash());

app.use(express.static(path.join(__dirname, '../build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({
  store: new FileStore({ retries: 0 }),
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// before all //


app.use((req, res, next) => {
  next();
});

app.use('/data/user', userRoutes);
app.use('/data/auth', authRoutes);
app.use('/data/app', appRoutes);
app.use('/data/products', productsRoutes);
app.use('/data/orders', ordersRoutes);

// after all //

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Server running at http://${process.env.HOST || 'localhost'}:${PORT}/`);
      }
    });
  })
  .catch(console.log);

module.exports = app;
