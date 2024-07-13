export abstract class ErrorBase extends Error {
  constructor(message?: string) {
    super(message);
  }
}
