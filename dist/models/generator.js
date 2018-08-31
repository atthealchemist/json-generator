"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = __importDefault(require("./commands"));
var parser_1 = __importDefault(require("./parser"));
var types_1 = require("./types");
var regex_1 = require("./regex");
var JsonGenerator = /** @class */ (function () {
    function JsonGenerator() {
        this.commands = new commands_1.default();
        this.parser = new parser_1.default();
    }
    JsonGenerator.prototype.processJson = function (json, parent) {
        var _this = this;
        var _a;
        var item;
        for (var key in json) {
            item = json[key];
            console.log("ProcessJson.key", key);
            console.log("ProcessJson.value", json[key]);
            switch (this.parser.getObjectType(key)) {
                case types_1.ObjectType.HIDDEN:
                    console.log("ProcessJson.ObjectType::HIDDEN.hiddenKey", key);
                    delete json[key];
                    break;
                case types_1.ObjectType.REPEAT:
                    console.log("ProcessJson.ObjectType::REPEAT.key", key);
                    var command_1 = this.parser.parseCommand(key);
                    console.log("ProcessJson.ObjectType::REPEAT.command", command_1);
                    var arrayKey = command_1.args[0];
                    var start = parseInt(command_1.args[1]);
                    var end = parseInt(command_1.args[2]);
                    var repeatCount = this.commands["number"](start, end);
                    console.log("ProcessJson.ObjectType::REPEAT.repeatCount", repeatCount);
                    console.log("ProcessJson.ObjectType::REPEAT.repeatedItem", json[key]);
                    console.log("ProcessJson.ObjectType::REPEAT.for.item", json[key]);
                    json[arrayKey] = [];
                    for (var i = 0; i < repeatCount; i++) {
                        json[arrayKey].push(json[key]);
                    }
                    console.log("ProcessJson.ObjectType::REPEAT.json[arrayKey]", json[arrayKey]);
                    delete json[key];
                    for (var _i = 0, _b = json[arrayKey]; _i < _b.length; _i++) {
                        var item_1 = _b[_i];
                        this.processJson(item_1);
                    }
                    break;
            }
            var command = this.parser.parseCommand(item);
            console.log("ProcessJson.command", command);
            switch (command.type) {
                case types_1.ObjectType.ARRAY:
                    if (typeof json[key] === "object") {
                        console.log("ProcessJson.ObjectType::ARRAY.value", json[key]);
                        var array = json[key];
                        console.log("ProcessJson.ObjectType::ARRAY.array", array);
                        for (var _c = 0, array_1 = array; _c < array_1.length; _c++) {
                            var item_2 = array_1[_c];
                            console.log("ProcessJson.ObjectType::ARRAY.for.item", item_2);
                            this.processJson(item_2);
                        }
                    }
                    break;
                case types_1.ObjectType.OBJECT:
                    console.log("ProcessJson.ObjectType::OBJECT.value", json[key]);
                    parent = json;
                    this.processJson(item, parent);
                    break;
                case types_1.ObjectType.COMMAND:
                    console.log("ProcessJson.ObjectType::COMMAND.command", command);
                    if (command.manyCommands) {
                        console.log("ProcessJson.ObjectType::COMMAND.manyCommands", command);
                    }
                    if (command.hasArgs) {
                        json[key] = (_a = this.commands)[command.name].apply(_a, command.args);
                    }
                    else {
                        var matches_1 = command.origin.match(regex_1.REGEX_MATCH_COMMAND);
                        if (matches_1 && matches_1.length > 0) {
                            json[key] = command.origin.replace(regex_1.REGEX_MATCH_COMMAND, this.commands[command.name]());
                        }
                    }
                    break;
                case types_1.ObjectType.POINTER:
                    console.log("ProcessJson.ObjectType::POINTER.value", json[key]);
                    var matches = json[key].match(regex_1.REGEX_MATCH_POINTER);
                    if (matches && matches.length > 0) {
                        json[key] = json[key].replace(regex_1.REGEX_MATCH_POINTER, function (pointer) {
                            var pointerKey = _this.parser.parseName(pointer);
                            console.log("ProcessJson.ObjectType::POINTER.replace.pointerKey", pointerKey);
                            return json[pointerKey];
                        });
                    }
                    else {
                        console.log("ProcessJson.ObjectType::POINTER.value => NOT_MATCH", json[key]);
                    }
                    break;
                case types_1.ObjectType.PARENT:
                    console.log("ProcessJson.ObjectType::PARENT.parent", parent);
                    console.log("ProcessJson.ObjectType::PARENT.value", json[key]);
                    json[key] = json[key].replace(regex_1.REGEX_MATCH_PARENT, function (mom) {
                        var parentKey = mom.replace("^", "");
                        console.log("ProcessJson.ObjectType::PARENT.parentKey", parentKey);
                        console.log("ProcessJson.ObjectType::PARENT.parentVal", parent[parentKey]);
                        return parent[parentKey];
                    });
                    break;
            }
        }
    };
    JsonGenerator.prototype.generateJson = function (document) {
        var json = JSON.parse(document);
        console.log("GenerateJson.json", json);
        this.processJson(json);
        return JSON.stringify(json, null, 2);
    };
    return JsonGenerator;
}());
exports.default = JsonGenerator;
//# sourceMappingURL=generator.js.map