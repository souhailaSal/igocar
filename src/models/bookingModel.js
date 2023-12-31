import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cars",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    fromSlot: {
      type: Date,
      required: true,
    },
    toSlot: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// check if booking model is already created
if (mongoose.models.bookings) {
  const bookingModel = mongoose.model("bookings");
  mongoose.deleteModel(bookingModel.modelName);
}

const Booking = mongoose.model("bookings", bookingSchema);

export default Booking;
