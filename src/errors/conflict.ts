export default class ConflictError extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

