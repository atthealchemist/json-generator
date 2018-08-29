"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var CommandObject = /** @class */ (function () {
    function CommandObject() {
        this.name = "";
        this.hasArgs = false;
        this.type = types_1.ObjectType.COMMAND;
        this.args = [];
        this.key = "key";
        this.manyCommands = false;
        this.origin = "@command";
        this.subCommands = {};
    }
    return CommandObject;
}());
exports.CommandObject = CommandObject;
