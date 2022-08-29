const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    ru: {
      type: String,
      required: [true, "Title is required"],
    },
    ua: {
      type: String,
      required: [true, "Title is required"],
    },
    en: {
      type: String,
      required: [true, "Title is required"],
    },
    pl: {
      type: String,
      required: [true, "Title is required"],
    },
    de: {
      type: String,
      required: [true, "Title is required"],
    },
  },
  weight_g: {
    type: Number,
    required: [true, "Weight in gramm is required"],
  },
  calories_kcal: {
    type: Number,
  },
  meal: {
    type: String,
  }
});

const foodDiarySchema = Schema(
  {
    diary_day: {
      type: String,
      required: [true, "Diary day is required"],
    },
    products: [productSchema],
    calories_in_day: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const FoodDiary = model("fooddiar", foodDiarySchema);

module.exports = {
  FoodDiary,
};
