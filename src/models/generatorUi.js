"use strict";
exports.__esModule = true;
var vscode_1 = require("vscode");
var generator_1 = require("./generator");
var path_1 = require("path");
var date_time_js_1 = require("date-time-js");
var JsonGeneratorUI = /** @class */ (function () {
    function JsonGeneratorUI() {
        this.statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
        this.setUpStatusBar(this.statusBarItem);
        this.statusBarItem.show();
        this.generator = new generator_1["default"]();
    }
    JsonGeneratorUI.prototype.setUpStatusBar = function (item) {
        var doc = vscode_1.window.activeTextEditor.document;
        if (doc.languageId === "json") {
            item.text = "$(pencil) JsonGenerator";
            //   item.color = "green";
            item.show();
        }
    };
    JsonGeneratorUI.prototype.startGeneration = function () {
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        console.log('"jsongeneration" is now active!');
        var newFile = vscode_1.Uri.parse("untitled:" +
            path_1["default"].join(vscode_1.workspace.rootPath, "generated_at_" + new date_time_js_1.DateTime().format("DDMMYYYY_HHmm") + ".json"));
        var currentOpenedDocument = vscode_1.window.activeTextEditor.document.getText();
        // let generatedFile = JSON.stringify(
        //   this.generator.generateJson(currentOpenedDocument),
        //   null,
        //   2
        // );
        vscode_1.workspace.openTextDocument(newFile).then(function (document) {
            var edit = new vscode_1.WorkspaceEdit();
            edit.insert(newFile, new vscode_1.Position(0, 0), "hello");
            return vscode_1.workspace.applyEdit(edit).then(function (success) {
                if (success) {
                    vscode_1.window.showTextDocument(document, vscode_1.ViewColumn.Two);
                }
                else {
                    vscode_1.window.showInformationMessage("Error!");
                }
            });
        });
    };
    JsonGeneratorUI.prototype.dispose = function () {
        this.statusBarItem.dispose();
    };
    return JsonGeneratorUI;
}());
exports["default"] = JsonGeneratorUI;
