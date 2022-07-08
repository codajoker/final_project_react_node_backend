const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema(
  {
    categories: {
      type: [String],
      required: [true, "Categories is required"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },
    title: {
      ru: {
        type: String,
        required: [true, "Title is required"],
      },
      ua: {
        type: String,
        required: [true, "Title is required"],
      },
    },
    calories: {
      type: Number,
      required: [true, "Calories is required"],
    },
    groupBloodNotAllowed: {
      type: [null, Boolean],
      default: null,
      required: [true, "Group blood is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaProduct = Joi.object({
  categories: Joi.array().items(Joi.string()).required(),
  weight: Joi.number().required(),
  title: Joi.object({
    ru: Joi.string().required(),
    ua: Joi.string().required(),
  }).required(),
  calories: Joi.number().required(),
  groupBloodNotAllowed: Joi.array().items(Joi.boolean()).required(),
});

const Product = model("product", productSchema);

module.exports = {
  Product,
  joiSchemaProduct,
};
