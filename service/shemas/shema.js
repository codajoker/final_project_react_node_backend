const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
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
        default: null,
    },
    name: {
      type: String,
    }
  },
  {
    versionKey: false,
  }
);
const joiSchemaRegistration = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  name: Joi.string().required(),
});
const joiSchemaLogin = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  token: Joi.string(),

});

const User = mongoose.model("user", users);

module.exports = { User, joiSchemaRegistration,joiSchemaLogin  };
