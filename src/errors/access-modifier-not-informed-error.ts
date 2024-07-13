import { ErrorBase } from "./error-base";

export class AccessModifierNotInformedError extends ErrorBase {
  constructor(message: string) {
    super(message);
  }
}
