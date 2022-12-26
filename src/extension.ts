import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("macro.helloWorld", () => {
    getSelectedFile();
    vscode.window.showInformationMessage("Hello World from macro!");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

//function to get file details explorer file right clicked
export async function getSelectedFile() {
  let selectedFile = await vscode.window.activeTextEditor?.document.fileName;
  console.log(selectedFile);
  return selectedFile;
}
