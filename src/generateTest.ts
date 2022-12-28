import { TextEncoder } from "util";
import * as vscode from "vscode";
import * as fs from "fs";
import { getDirAndFile, pascalCase } from "./utils/utils";
import { testTemplate } from "./utils/template";

const generateTestFile = async (
  context: vscode.ExtensionContext,
  path: string
) => {
  const uri = vscode.Uri.file(path);
  const { dir, fileName } = getDirAndFile(uri.path);
  const file = fileName?.replace(".tsx", "");

  const testFileName = vscode.Uri.file(`${dir}/${file}.spec.tsx`);
  const componentName = pascalCase(file);

  if (file?.includes(".spec")) {
    return vscode.window.showErrorMessage("This is a test file");
  }
  if (fs.existsSync(testFileName.fsPath)) {
    return vscode.window.showErrorMessage("Test already exists");
  }

  vscode.workspace.fs
    .writeFile(
      testFileName,
      new TextEncoder().encode(testTemplate(componentName, file))
    )
    .then(() => {
      vscode.window.showInformationMessage("Test generated");
    }),
    () => {
      vscode.window.showErrorMessage("Error generating test");
    };
};

export { generateTestFile };
