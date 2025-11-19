class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

class NotAuthenticatedError extends Error {
  /** Error with the message "You are not authenticated" */
  constructor() {
    super("You are not authenticated");
    this.name = "NotAuthenticatedError";
    this.status = 401;
  }
}

class NotAuthorizedError extends Error {
  /** Error with the message "You are not authorized" */
  constructor() {
    super("You are not authorized");
    this.name = "NotAuthorizedError";
    this.status = 403;
  }
}

class InvalidTokenError extends Error {
  /** Error with the message "Token is not valid" */
  constructor() {
    super("Token is not valid");
    this.name = "NotAuthorizedError";
    this.status = 403;
  }
}

class NotAuthorizedAsAdminError extends Error {
  /** Error with the message "You are not authorized as an admin" */
  constructor() {
    super("You are not authorized as an admin");
    this.name = "NotAuthorizedAsAdminError";
    this.status = 403;
  }
}

class NotAuthorizedToEditError extends Error {
  /** Error with the message "Only admins can edit other users' data" */
  constructor() {
    super("Only admins can edit other users' data");
    this.name = "NotAuthorizedToEditError";
    this.status = 403;
  }
}

class NotFoundError extends Error {
  /** Error with the message "{resourceName} not found" */
  constructor(resourceName) {
    super(`${resourceName} not found`);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

class UnkownEndpointError extends Error {
  /** Error with the message "Unknown endpoint" */
  constructor() {
    super("Unknown endpoint");
    this.name = "UnkownEndpointError";
    this.status = 404;
  }
}

class UnprocessableContentError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnprocessableContentError";
    this.status = 422;
  }
}

const errors = {
  ValidationError,
  NotAuthenticatedError,
  InvalidTokenError,
  NotAuthorizedAsAdminError,
  NotAuthorizedError,
  NotAuthorizedToEditError,
  UnkownEndpointError,
  NotFoundError,
  UnprocessableContentError,
};

export default errors;
