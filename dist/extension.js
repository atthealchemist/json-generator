"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var generatorUi_1 = __importDefault(require("./models/generatorUi"));
function activate(context) {
    var ui = new generatorUi_1.default();
    var disposable = vscode_1.commands.registerCommand("jsongeneration.generate", function () { return ui.startGeneration(); });
    context.subscriptions.push(ui);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map