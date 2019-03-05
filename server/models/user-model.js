const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Counter = require('./counter-model');

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  date_add: {
    type: Number
  },
  date_update: {
    type: Number
  },
  number: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
    validate: {
      isAsync: true,
      validator: function emailValidator(v, cb) {
        const data = this;
        if (!validator.isEmail(v)) {
          cb(false);
        } else {
          const user = mongoose.model('User', userSchema);
          user.find({ email: v, _id: { $ne: data._id } })
            .then((res) => {
              cb(res.length === 0, 'This e-mail already registered');
            })
            .catch(console.log);
        }
      },
      message: props => `${props.value} is not a valid e-mail!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password has a least 6 characters long'],
    maxlength: [12, 'Password has to be not longer of 12 characters'],
    validate: {
      validator: (v) => v.match(/\s/) === null,
      message: 'Default error message'
    }
  },
  first_name: {
    type: String,
    minlength: [2, 'First name has to be longer']
  },
  last_name: {
    type: String,
    minlength: [2, 'Last name has to be longer']
  }
});

userSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    ret.id = ret._id + '';
    ret.date_add = new Date(new Date().setTime(ret.date_add)).toUTCString();
    delete ret.password;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

function hashPassword(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    next();
  }
}

function addDateUpdate(next) {
  const user = this;
  user.date_update = new Date().getTime();
  next();
}

function addDateAdd(next) {
  const user = this;
  if (!user.date_add) {
    user.date_add = new Date().getTime();
  }
  next();
}

function addLeadingZeros(n, length = 10) {
  return '0'.repeat(length - n.toString().length) + n;
}

function addUserNumber(next) {
  const user = this;
  if (!user.number) {
    Counter.findOne({ subject: 'user' })
      .then((res) => {
        user.number = addLeadingZeros(res.count + 1);
        Counter.updateOne({ _id: res._id }, { $inc: { count: 1 } })
          .catch(console.log);
        next();
      }).catch(console.log);
  } else {
    next();
  }
}

userSchema.pre('save', addUserNumber);

userSchema.pre('save', addDateAdd);

userSchema.pre('save', addDateUpdate);

userSchema.pre('save', hashPassword);

function comparePassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
}

userSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('User', userSchema);
