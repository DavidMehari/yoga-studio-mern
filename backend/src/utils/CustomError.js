export default class CustomError extends Error {
  constructor(status, message, name = 'CustomError') {
    super(message);
    this.status = status;
    this.name = name;
  }
}
