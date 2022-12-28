import { TextEncoder } from "util";
import * as vscode from "vscode";
import * as fs from "fs";
import { inputOptions, kebabCase } from "./utils/utils";
import { componentTemplate, testTemplate } from "./utils/template";

const generateBothFiles = async (
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
      `${uri.path}/${kebabCase(fileName)}/${kebabCase(fileName)?.concat(
        ".tsx"
      )}`
    );
    const testFileName = vscode.Uri.file(
      `${uri.path}/${kebabCase(fileName)}/${kebabCase(fileName)?.concat(
        ".spec.tsx"
      )}`
    );

    if (fs.existsSync(componentFile.fsPath)) {
      return vscode.window.showErrorMessage("Component already exists");
    }
    if (fs.existsSync(testFileName.fsPath)) {
      return vscode.window.showErrorMessage("Test already exists");
    }

    vscode.workspace.fs.createDirectory(
      vscode.Uri.file(`${uri.path}/${kebabCase(fileName)}`)
    ),
      () => {
        vscode.window.showErrorMessage("Error generating Component");
      };

    vscode.workspace.fs
      .writeFile(
        componentFile,
        new TextEncoder().encode(componentTemplate(fileName))
      )
      .then(() => {
        vscode.window.showInformationMessage("Component generated");
      }),
      () => {
        vscode.window.showErrorMessage("Error generating Component");
      };

    vscode.workspace.fs
      .writeFile(
        testFileName,
        new TextEncoder().encode(testTemplate(fileName, kebabCase(fileName)))
      )
      .then(() => {
        vscode.window.showInformationMessage("Test generated");
      }),
      () => {
        vscode.window.showErrorMessage("Error generating test");
      };
  }),
    () => {
      vscode.window.showErrorMessage("Error generating Component");
    };
};

export { generateBothFiles };
