const mongoose = require('mongoose');
const validator = require('validator');
const Counter = require('./counter-model');

const ProductSchema = mongoose.Schema({
  name: String,
  picture: String,
  slug: String,
  price: Number,
  quantity: Number
});
const StagesSchema = mongoose.Schema({
  new: Number,
  payed: Number,
  dispatched: Number,
  received: Number
});

const orderSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  creationDate: {
    type: Number
  },
  number: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid e-mail!`
    }
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    minlength: [2, 'First name has to be longer']
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    minlength: [2, 'Last name has to be longer']
  },
  toFirstName: {
    type: String,
    required: [true, 'first name addressee is required'],
  },
  toLastName: {
    type: String,
    required: [true, 'last name addressee is required'],
  },
  toCity: {
    type: String,
    required: [true, 'city is required'],
  },
  toZip: {
    type: String,
    required: [true, 'zip is required'],
  },
  toAddress: {
    type: String,
    required: [true, 'address is required'],
  },
  toPhone: {
    type: String,
    required: [true, 'phone is required'],
  },
  phone: {
    type: String,
    required: [true, 'phone is required'],
  },
  cardNumber: {
    type: String,
    required: [true, 'card_number is required'],
  },
  products: {
    type: [ProductSchema],
    required: [true, 'products are required'],
    default: undefined,
  },
  total: {
    type: Number,
    required: [true, 'total is required'],
  },
  count: {
    type: Number,
    required: [true, 'count is required'],
  },
  stages: {
    type: StagesSchema,
  },
  trackingNumber: {
    type: String
  },
});

orderSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    ret.id = ret._id+'';
    ret.creationDate = new Date(new Date().setTime(ret.creationDate)).toUTCString();
    delete ret.password;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

function addCreatedDate(next) {
  const order = this;
  if (!order.creationDate) {
    order.creationDate = new Date().getTime();
  }
  next();
}

function addLeadingZeros(n, length = 10) {
  return '0'.repeat(length - n.toString().length) + n;
}

function maskCartNumber(){
  const order = this;
  if (order.cardNumber.search('*') === -1) {
    order.cardNumber = '*'.repeat(order.cardNumber.length - 4) + order.cardNumber.substring(order.cardNumber.length - 4);
  }
  next();
}


function addOrderNumber(next){
  const order = this;
  if (!order.number) {
    Counter.findOne({ subject: 'order' })
      .then((res) =>{
        order.number = addLeadingZeros(res.count + 1);
        Counter.updateOne({_id: res._id}, { $inc: { count: 1 }})
          .catch(()=>{});
        next();
      }).catch(console.log);
  }else{
    next();
  }
}

orderSchema.pre('save', maskCartNumber);

orderSchema.pre('save', addOrderNumber);

orderSchema.pre('save', addCreatedDate);

module.exports = mongoose.model('Order', orderSchema);
