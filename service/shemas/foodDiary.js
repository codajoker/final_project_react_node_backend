const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
  title: {
    type: Object,
    required: [true, "Title is required"],
  },
  weight_g: {
    type: Number,
    required: [true, "Weight in gramm is required"],
  },
  calories_kcal: {
    type: Number,
  },
});

const foodDiarySchema = Schema(
  {
    diary_day: {
      type: String,
      required: [true, "Dayry day is required"],
    },
    meal: [mealSchema],
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
