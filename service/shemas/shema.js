const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const users = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: v4(),
    },
    name: {
      type: String,
    },
    height: {
      type: Number,
      min: [1, "Height must be greater than 1"],
    },
    age: {
      type: Number,
    },
    currentWeight: {
      type: Number,
    },
    goalWeight: {
      type: Number,
    },
    bloodType: {
      type: Number,
      default: null,
    },
    notAllowedFood: {
      type: Array,
      default: [],
    },
    dailyCalories: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);
const joiSchemaRegistration = Joi.object({
  password: Joi.string().min(8).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  name: Joi.string().required(),
});
const joiSchemaLogin = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  token: Joi.string(),
});

const JoiSchemaCalories = Joi.object({
  height: Joi.number().min(1).required(),
  age: Joi.number().required(),
  currentWeight: Joi.number().required(),
  goalWeight: Joi.number().required(),
  bloodType: Joi.number().required(),
  notAllowedFood: Joi.array(),
  dailyCalories: Joi.number(),
});

const User = mongoose.model("user", users);

module.exports = {
  User,
  joiSchemaRegistration,
  joiSchemaLogin,
  JoiSchemaCalories,
};
