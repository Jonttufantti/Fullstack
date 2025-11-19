import mongoose from "mongoose";

const timeFormatValidator = {
  validator: function (value) {
    // Only numbers allowed
    if (!/^\d+$/.test(value)) return false;

    const hours = parseInt(value);

    return hours >= 0 && hours <= 24;
  },
  message: (props) =>
    `${props.path} should contain hours between 0 and 24. Got '${props.value}'`,
};

const endTimeValidator = {
  validator: function (value) {
    const startHours = parseInt(this.get("startTime"));
    const endHours = parseInt(value);
    return endHours > startHours;
  },
  message: "endTime cannot be before or at the same as startTime.",
};

const ComputerReservationSchema = new mongoose.Schema(
  {
    computerId: {
      type: mongoose.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      validate: timeFormatValidator,
    },
    endTime: {
      type: String,
      required: true,
      validate: [timeFormatValidator, endTimeValidator],
    },
  },
  { timestamps: true }
);

export default mongoose.model("ComputerReservation", ComputerReservationSchema);
