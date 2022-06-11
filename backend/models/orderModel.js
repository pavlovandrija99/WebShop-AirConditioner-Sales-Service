import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
    orderItems: [{}],
    orderDateAndTime: {
      type: Date,
    },
    orderPrice: {
      type: String,
    },
    orderAddress: {
      type: String,
    },
    orderCity: {
      type: String,
    },
    orderPostalCode: {
      type: String,

    },
    orderCountry: {
      type: String,
    },
    orderPaymentMethod: {
      type: String,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

orderSchema.pre("remove", async function (next) {
  await this.model("paymentModel").deleteOne({ _id: this.payment });
  next();
});

const orderModel = mongoose.model("orderModel", orderSchema, "Order");

export default orderModel;
