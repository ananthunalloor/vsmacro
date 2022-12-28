import { TextEncoder } from "util";
import * as vscode from "vscode";
import * as fs from "fs";
import { getDirAndFile, pascalCase } from "./utils/utils";
import { advancedTestTemplate, testTemplate } from "./utils/template";
import { generateTestCases } from "./utils/testGenerator";

const generateAdvancedTestFile = async (
  context: vscode.ExtensionContext,
  path: string
) => {
  const uri = vscode.Uri.file(path);
  const { dir, fileName } = getDirAndFile(uri.path);
  const file = fileName?.replace(".tsx", "");

  const testCases = await generateTestCases(uri.fsPath);

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
      new TextEncoder().encode(
        advancedTestTemplate(componentName, file, testCases)
      )
    )
    .then(() => {
      vscode.window.showInformationMessage("Test generated");
    }),
    () => {
      vscode.window.showErrorMessage("Error generating test");
    };
};

export { generateAdvancedTestFile };
