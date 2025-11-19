import errors from "../utils/errors.js";

const unknownEndpoint = (request, response, next) => {
  return next(new errors.UnkownEndpointError("unknown endpoint"));
};

export default unknownEndpoint;
