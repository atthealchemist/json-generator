"use strict";
exports.__esModule = true;
var vscode_1 = require("vscode");
var generatorUi_1 = require("./models/generatorUi");
function activate(context) {
    var ui = new generatorUi_1["default"]();
    var disposable = vscode_1.commands.registerCommand("extension.generateJson", function () {
        ui.startGeneration();
    });
    context.subscriptions.push(ui);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
