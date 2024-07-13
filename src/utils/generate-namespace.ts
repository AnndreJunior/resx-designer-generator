import * as vscode from "vscode";
import path from "path";
import { NoWorkspaceOpenError } from "../errors/no-workspace-open-error";

export function generateNamespace(folderPath: string): string {
  // check if there is no workspace open
  if (!vscode.workspace.workspaceFolders) {
    throw new NoWorkspaceOpenError("Workspace not found");
  }
  const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const relativePath = path.relative(rootPath, folderPath);
  const namespace = relativePath.split(path.sep).join(".");
  return namespace;
}
