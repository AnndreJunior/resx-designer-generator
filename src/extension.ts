import * as vscode from "vscode";
import { getAccessModifier } from "./utils/get-access-modifier";
import { ErrorBase } from "./errors/error-base";

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createDesignerClass",
    async (resource: vscode.Uri) => {
      try {
        const accessModifier = await getAccessModifier();
      } catch (error) {
        if (error instanceof ErrorBase) {
          vscode.window.showErrorMessage(error.message);
        } else {
          vscode.window.showErrorMessage("Internal error");
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
