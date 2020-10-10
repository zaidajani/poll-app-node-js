const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  votes: {
    type: Number,
    default: 0
  }
});

const schema = new mongoose.Schema({
  first: optionSchema,
  second: optionSchema,
  third: optionSchema,
  fourth: optionSchema,
  redirectkey: { 
    type: String,
    required: true
  }
});

const Model = mongoose.model('polls', schema);

function validate(poll) {
  const schema = {
    first: Joi.string().min(3).max(40).required(),
    second: Joi.string().min(3).max(40).required(),
    third: Joi.string().min(3).max(40).required(),
    fourth: Joi.string().min(3).max(40).required(),
  }

  return Joi.validate(poll, schema);
}

exports.validate = validate;
exports.Model = Model;