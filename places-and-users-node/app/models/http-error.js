class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add a message propery to instance

    this.code = errorCode;
  }
}

module.exports = HttpError;
