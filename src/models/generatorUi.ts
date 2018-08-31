import {
  window,
  StatusBarAlignment,
  StatusBarItem,
  Uri,
  workspace,
  WorkspaceEdit,
  Position,
  ViewColumn,
  TextDocument
} from "vscode";
import JsonGenerator from "./generator";
import path from "path";
import moment from "moment";

export default class JsonGeneratorUI {
  private statusBarItem: StatusBarItem;
  private generator: JsonGenerator;
  private generatedDocument: TextDocument;
  private newFile;
  private generatedFile;

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
      item.text = `$(code) Json Generator`;
      item.command = "jsongeneration.generate";
      //   item.color = "green";
      item.show();
    }
  }

  startGeneration() {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log("JsonGeneratorUi.StartGeneration: extension is now active!");
    console.log("JsonGeneratorUi.StartGeneration: aaa");

    let fileName = `generated_at_${moment().format("DDMMYYYY_HHmm")}.json`;
    console.log("JsonGeneratorUi.StartGeneration: bbb");
    // let workspacePath = workspace.workspaceFolders[0];

    let filePath = path.join(
      path
        .dirname(window.activeTextEditor.document.uri.path)
        .replace("\\", "/"),
      `${fileName}`
    );

    console.log(
      "JsonGeneratorUi.StartGeneration: opened file filepath",
      filePath
    );

    this.newFile = Uri.file(filePath);
    this.newFile.scheme = "untitled";
    console.log("JsonGeneratorUi.StartGeneration: newFile", this.newFile);

    let currentOpenedDocumentText = window.activeTextEditor!.document.getText();
    console.log(
      "JsonGeneratorUi.StartGeneration: currentOpenedDocument",
      currentOpenedDocumentText
    );

    let generatedDocument = this.generator.generateJson(currentOpenedDocumentText);
    this.generatedFile = JSON.stringify(generatedDocument, null, 2);

    // let generatedFile = JSON.stringify(
    //   this.generator.generateJson(currentOpenedDocument),
    //   null,
    //   2
    // );

    // this.generatedFile = `hello`;
    

    workspace.openTextDocument(this.newFile).then(document => this.documentOpened(document));
  }

  private documentOpened(doc: TextDocument) {
    const edit = new WorkspaceEdit();
    edit.insert(this.newFile, new Position(0, 0), this.generatedFile);
    workspace.applyEdit(edit).then(success => this.successfulEdit(success, doc));
  }

  private successfulEdit(success: boolean, document: TextDocument) {
    if (success) {
      window.showTextDocument(document, ViewColumn.Beside, true);
    }
  }

  dispose() {
    this.statusBarItem.dispose();
  }
}
