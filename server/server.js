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
const port = process.env.SERVER_PORT || 5000;
const hostname = process.env.SERVER_HOSTNAME || 'localhost';

const { connect } = require( './config/mongoose');

process.on('unhandledRejection', () => {});
// middlewares //

app.use(cors({
  origin:[`http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`],
  methods:['POST', 'PUT'],
  credentials: true // enable set cookie
}));

app.use(morgan('combined'));
app.use(flash());

app.use(express.static(path.join(__dirname, '../build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({
  store: new FileStore({retries: 0}),
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie:{
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
app.get('*', (req, res) =>{
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use((req, res, next) => {});

//app.use('/', express.static(path.join(__dirname, '../build')));

connect()
  .then(() => {
    app.listen(port, hostname, () => {
      if(process.env.NODE_ENV === 'development') {
        console.log(`Server running at http://${hostname}:${port}/`);
      }
    });
  })
  .catch(console.log);

module.exports = app;
