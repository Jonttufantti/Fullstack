import mongoose from "mongoose";

const ComputerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    computerNumbers: [{ number: Number, unavalaibleDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Computer", ComputerSchema);
