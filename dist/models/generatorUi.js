"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var generator_1 = __importDefault(require("./generator"));
var path_1 = __importDefault(require("path"));
var moment_1 = __importDefault(require("moment"));
var JsonGeneratorUI = /** @class */ (function () {
    function JsonGeneratorUI() {
        this.statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
        this.setUpStatusBar(this.statusBarItem);
        this.statusBarItem.show();
        this.generator = new generator_1.default();
    }
    JsonGeneratorUI.prototype.setUpStatusBar = function (item) {
        var doc = vscode_1.window.activeTextEditor.document;
        if (doc.languageId === "json") {
            item.text = "$(code) Json Generator";
            item.command = "jsongeneration.generate";
            //   item.color = "green";
            item.show();
        }
    };
    JsonGeneratorUI.prototype.startGeneration = function () {
        var _this = this;
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        console.log("JsonGeneratorUi.StartGeneration: extension is now active!");
        console.log("JsonGeneratorUi.StartGeneration: aaa");
        var fileName = "generated_at_" + moment_1.default().format("DDMMYYYY_HHmm") + ".json";
        console.log("JsonGeneratorUi.StartGeneration: bbb");
        // let workspacePath = workspace.workspaceFolders[0];
        var filePath = path_1.default.join(path_1.default
            .dirname(vscode_1.window.activeTextEditor.document.uri.path)
            .replace("\\", "/"), "" + fileName);
        console.log("JsonGeneratorUi.StartGeneration: opened file filepath", filePath);
        this.newFile = vscode_1.Uri.file(filePath);
        this.newFile.scheme = "untitled";
        console.log("JsonGeneratorUi.StartGeneration: newFile", this.newFile);
        var currentOpenedDocumentText = vscode_1.window.activeTextEditor.document.getText();
        console.log("JsonGeneratorUi.StartGeneration: currentOpenedDocument", currentOpenedDocumentText);
        var generatedDocument = this.generator.generateJson(currentOpenedDocumentText);
        this.generatedFile = JSON.stringify(generatedDocument, null, 2);
        // let generatedFile = JSON.stringify(
        //   this.generator.generateJson(currentOpenedDocument),
        //   null,
        //   2
        // );
        // this.generatedFile = `hello`;
        vscode_1.workspace.openTextDocument(this.newFile).then(function (document) { return _this.documentOpened(document); });
    };
    JsonGeneratorUI.prototype.documentOpened = function (doc) {
        var _this = this;
        var edit = new vscode_1.WorkspaceEdit();
        edit.insert(this.newFile, new vscode_1.Position(0, 0), this.generatedFile);
        vscode_1.workspace.applyEdit(edit).then(function (success) { return _this.successfulEdit(success, doc); });
    };
    JsonGeneratorUI.prototype.successfulEdit = function (success, document) {
        if (success) {
            vscode_1.window.showTextDocument(document, vscode_1.ViewColumn.Beside, true);
        }
    };
    JsonGeneratorUI.prototype.dispose = function () {
        this.statusBarItem.dispose();
    };
    return JsonGeneratorUI;
}());
exports.default = JsonGeneratorUI;
//# sourceMappingURL=generatorUi.js.map