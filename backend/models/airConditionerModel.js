import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  },
  { timestamps: true }
);

const airConditionerSchema = mongoose.Schema(
  {
    airConditionerType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airConditionerTypeModel",
    },
    airConditionerModel: {
      type: String,
      required: true,
    },
    airConditionerPrice: {
      type: String,
      required: true,
    },
    powerConsumption: {
      type: String,
    },
    operatingTemperatureRange: {
      type: String,
    },
    indoorUnitDimension: {
      type: String,
    },
    outdoorUnitDimension: {
      type: String,
    },
    coolingCapacity: {
      type: String,
    },
    heatingCapacity: {
      type: String,
    },
    energyClass: {
      type: String,
    },
    airConditionerDescription: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const airConditionerModel = mongoose.model(
  "airConditionerModel",
  airConditionerSchema,
  "Air Condition"
);

export default airConditionerModel;
