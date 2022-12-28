import * as vscode from "vscode";
import { generateTestFile } from "./generateTest";
import { generateComponentFile } from "./generateComponent";
import { generateAdvancedTestFile } from "./generateAdvancedTest";
import { generateBothFiles } from "./generateBoth";

export function activate(context: vscode.ExtensionContext) {
  let generateTest = vscode.commands.registerCommand(
    "macro.generateTest",
    (folder) => generateTestFile(context, folder.fsPath)
  );

  let generateBoth = vscode.commands.registerCommand(
    "macro.generateBoth",
    (folder) => generateBothFiles(context, folder.fsPath)
  );

  let generateComponents = vscode.commands.registerCommand(
    "macro.generateComponents",
    (folder) => generateComponentFile(context, folder.fsPath)
  );

  let generateAdvancedTest = vscode.commands.registerCommand(
    "macro.generateAdvancedTest",
    (folder) => generateAdvancedTestFile(context, folder.fsPath)
  );

  context.subscriptions.push(generateBoth);
  context.subscriptions.push(generateTest);
  context.subscriptions.push(generateComponents);
  context.subscriptions.push(generateAdvancedTest);
}

export function deactivate() {}
