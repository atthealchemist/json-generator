import {
  window,
  StatusBarAlignment,
  StatusBarItem,
  Uri,
  workspace,
  WorkspaceEdit,
  Position,
  ViewColumn
} from "vscode";
import JsonGenerator from "./generator";
import path from "path";
import { DateTime } from "date-time-js";

export default class JsonGeneratorUI {
  private statusBarItem: StatusBarItem;
  private generator: JsonGenerator;

  constructor() {
    this.statusBarItem = window.createStatusBarItem(
      StatusBarAlignment.Right,
      100
    );
    this.setUpStatusBar(this.statusBarItem);
    this.statusBarItem.show();

    this.generator = new JsonGenerator();
  }

  private setUpStatusBar(item: StatusBarItem) {
    let doc = window.activeTextEditor!.document;

    if (doc.languageId === "json") {
      item.text = `$(pencil) JsonGenerator`;
      //   item.color = "green";
      item.show();
    }
  }

  startGeneration() {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"jsongeneration" is now active!');

    const newFile = Uri.parse(
      "untitled:" +
        path.join(
          workspace.rootPath!,
          `generated_at_${new DateTime().format("DDMMYYYY_HHmm")}.json`
        )
    );

    let currentOpenedDocument = window.activeTextEditor!.document.getText();

    // let generatedFile = JSON.stringify(
    //   this.generator.generateJson(currentOpenedDocument),
    //   null,
    //   2
    // );

    workspace.openTextDocument(newFile).then(document => {
      const edit = new WorkspaceEdit();
      edit.insert(newFile, new Position(0, 0), "hello");
      return workspace.applyEdit(edit).then(success => {
        if (success) {
          window.showTextDocument(document, ViewColumn.Two);
        } else {
          window.showInformationMessage("Error!");
        }
      });
    });
  }

  dispose() {
    this.statusBarItem.dispose();
  }
}
