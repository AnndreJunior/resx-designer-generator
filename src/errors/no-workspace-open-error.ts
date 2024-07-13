import { ErrorBase } from "./error-base";

export class NoWorkspaceOpenError extends ErrorBase {
  constructor(message: string) {
    super(message);
  }
}
