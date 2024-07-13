import * as vscode from "vscode";
import { AccessModifierNotInformedError } from "../errors/access-modifier-not-informed-error";

export async function getAccessModifier(): Promise<string> {
  const accessModifierOptsResult = await vscode.window.showQuickPick(
    ["Public", "Internal"],
    {
      placeHolder: "Select access modifier for the class",
    }
  );

  const accessModifierNotInformed = !accessModifierOptsResult;
  if (accessModifierNotInformed) {
    throw new AccessModifierNotInformedError("Cancelled.");
  }
  return accessModifierOptsResult.toLocaleLowerCase();
}
