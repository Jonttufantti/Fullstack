import ComputerReservation from "./computerReservation.js";
import Computer from "../computer.js";
import errors from "../../../utils/errors.js";

const create = async ({ computerId, userId, date, startTime, endTime }) => {
  const computer = await Computer.findById(computerId);

  if (!computer) {
    throw new errors.NotFoundError("Computer");
  }

  // Only digits allowed for startTime
  if (!/^\d+$/.test(startTime)) {
    throw new errors.ValidationError(
      `startTime should contain only digits. Got '${startTime}'.`
    );
  }

  // Only digits allowed for endTime
  if (!/^\d+$/.test(endTime)) {
    throw new errors.ValidationError(
      `endTime should contain only digits. Got '${endTime}'.`
    );
  }

  const startTimeInt = parseInt(startTime);
  const endTimeInt = parseInt(endTime);
  const reservations = await ComputerReservation.find({
    computerId: computerId,
    date: date,
  });

  for (const reservation of reservations) {
    const existingStartTime = parseInt(reservation.startTime);
    const existingEndTime = parseInt(reservation.endTime);
    if (existingStartTime < endTimeInt && existingEndTime > startTimeInt) {
      throw new errors.UnprocessableContentError(
        "Reservation overlaps with an existing reservation"
      );
    }
  }

  const newReservation = new ComputerReservation({
    computerId,
    userId,
    date,
    startTime,
    endTime,
  });

  const savedReservation = await newReservation.save();
  return savedReservation;
};

const remove = async (reservationId, userId, isAdmin) => {
  const reservation = await ComputerReservation.findById(reservationId);

  if (!reservation) {
    throw new errors.NotFoundError("Reservation");
  }

  if (reservation.userId !== userId && !isAdmin) {
    throw new errors.NotAuthorizedToEditError();
  }

  await reservation.deleteOne();
};

const getById = async (id) => {
  const reservation = await ComputerReservation.findById(id);
  return reservation;
};

const getByUserId = async (userId, currentUserId, isAdmin) => {
  if (userId !== currentUserId && !isAdmin) {
    throw new errors.NotAuthorizedError();
  }

  const reservations = await ComputerReservation.find({
    userId: userId,
  });

  return reservations;
};

const getAll = async (computerId) => {
  const reservations = await ComputerReservation.find({
    computerId: computerId,
  });
  return reservations;
};

const computerReservationService = {
  create,
  remove,
  getById,
  getByUserId,
  getAll,
};

export default computerReservationService;
