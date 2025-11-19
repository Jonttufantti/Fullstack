import reservationService from "../../computers/reservations/reservations.service.js";

export const getReservations = async (req, res, next) => {
  const user = req.user;

  try {
    const reservations = await reservationService.getByUserId(
      req.params.userId,
      user.id,
      user.isAdmin
    );
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};
