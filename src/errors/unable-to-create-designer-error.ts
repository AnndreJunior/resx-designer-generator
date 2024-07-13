import { ErrorBase } from "./error-base";

export class UnableToCreateDesignerError extends ErrorBase {
  constructor(message: string) {
    super(message);
  }
}
