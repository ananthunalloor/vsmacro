import { TextEncoder } from "util";
import * as vscode from "vscode";
import * as fs from "fs";
import { inputOptions, kebabCase } from "./utils/utils";
import { componentTemplate } from "./utils/template";

const generateComponentFile = async (
  context: vscode.ExtensionContext,
  path: string
) => {
  const uri = vscode.Uri.file(path);

  vscode.window.showInputBox(inputOptions).then((value) => {
    if (!value) {
      return vscode.window.showErrorMessage("Component name is required");
    }

    const fileName = value?.replace(".tsx", "");

    const componentFile = vscode.Uri.file(
      `${uri.path}/${kebabCase(fileName)?.concat(".tsx")}`
    );

    if (fs.existsSync(componentFile.fsPath)) {
      return vscode.window.showErrorMessage("Component already exists");
    }
    vscode.workspace.fs
      .writeFile(
        componentFile,
        new TextEncoder().encode(componentTemplate(fileName || ""))
      )
      .then(() => {
        vscode.window.showInformationMessage("Component generated");
      }),
      () => {
        vscode.window.showErrorMessage("Error generating Component");
      };
  }),
    () => {
      vscode.window.showErrorMessage("Error generating Component");
    };
};

export { generateComponentFile };
