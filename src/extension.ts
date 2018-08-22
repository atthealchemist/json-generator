// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import moment from 'moment';
import JsonGenerator from "./models/generator";

// this method is called when your extension is activated
// your extension is activated the very first time the command s executed
export function activate(context: vscode.ExtensionContext) {


  // vscode.workspace.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
  //     if(event.textEditor === vscode.window.activeTextEditor) {
  //         provider.update(previewUri);
  //     }
  // });

//   const panel = vscode.window.createWebviewPanel(
//     "ebala",
//     "E BA LA",
//     vscode.ViewColumn.One,
//     {}
//   );
//   panel.webview.html = `
    
//     {
//         "name": "lorem",
//         "age": 3,
//         "shit": true
//     }

//     `;



vscode.commands.registerCommand('extension.generateJson', () => {
    runGenerateJsonCommand();
});



  // context.subscriptions.push(this);

  // context.subscriptions.push(disposable, registration);
}


function runGenerateJsonCommand() {

    // let previewUri = vscode.Uri.parse(
    //   "json-generator://authority/json-generator-preview"
    // );
  
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"jsongeneration" is now active!');
  
    let generator = new JsonGenerator();

    const newFile = vscode.Uri.parse("untitled:" + path.join(vscode.workspace.rootPath!, 
      `generated_at_${moment().format('DDMMYYYY_HHmm')}.json`));
  
  //   let jsonTest = `{
  //     "id": 1,
  //     "name": "Bertie Gray",
  //     "сode": "BertieGrayUser",
  //     "createDate": {
  //       "date": "2018-02-19",
  //       "time": "15:53:00",
  //       "year": 2018,
  //       "month": 2,
  //       "day": 19,
  //       "hour": 15,
  //       "minute": 53,
  //       "second": 0
  //     },
  //     "createUserName": "Clark Delaney",
  //     "stateId": 4,
  //     "phone": "+44 (990) 598-24-38",
  //     "email": "bertie_gray@miracula.ca"
  // }`;

    let currentOpenedDocument = vscode.window.activeTextEditor!.document.getText();

    let generatedFile = JSON.stringify(generator.generateJson(currentOpenedDocument), null, 2);

    vscode.workspace.openTextDocument(newFile).then(document => {
        const edit = new vscode.WorkspaceEdit();
        edit.insert(newFile, new vscode.Position(0, 0), generatedFile);
        return vscode.workspace.applyEdit(edit).then(success => {
          if (success) {
            vscode.window.showTextDocument(document, vscode.ViewColumn.Two);
          } else {
            vscode.window.showInformationMessage("Error!");
          }
        });
      });
}


// this method is called when your extension is deactivated
export function deactivate() {}