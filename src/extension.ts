import {commands, ExtensionContext} from "vscode";
import JsonGeneratorUI from "./models/generatorUi";

export function activate(context: ExtensionContext) {

  let ui = new JsonGeneratorUI();

  let disposable = commands.registerCommand(
    "jsongeneration.generate", () =>  ui.startGeneration()
  );

  context.subscriptions.push(ui);
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
