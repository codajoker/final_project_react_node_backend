const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
  id: {
    type: Number,
    required: [true, "ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  weight_g: {
    type: Number,
    required: [true, "Weight in gramm is required"],
  },
  calories_kcal: {
    type: Number,
    required: [true, "Calories in kcal is required"],
  },
});

const foodDiarySchema = Schema(
  {
    diary_day: {
      type: [String],
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

const foodDiary = model("foodDiary", foodDiarySchema);

module.exports = {
  foodDiary,
};
