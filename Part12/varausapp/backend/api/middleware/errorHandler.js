// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log("--------------------------------------------------------------");
  console.log();

  let errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  if (err.name === "CastError" || err.name === "ValidationError") {
    errorStatus = 400;
  }

  return res.status(errorStatus).json({
    message: errorMessage,
  });
};

export default errorHandler;
