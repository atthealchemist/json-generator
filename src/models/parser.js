"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var commandObject_1 = require("./commandObject");
var regex_1 = require("./regex");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.hasArgs = function (cmd) {
        var matches = cmd.match(regex_1.REGEX_HAS_ARGS);
        if (matches && matches.length > 0) {
            return true;
        }
        return false;
    };
    Parser.prototype.hasSubCommands = function (cmd) {
        var matches = cmd.match(regex_1.REGEX_SUBCOMMANDS);
        if (matches && matches.length > 1) {
            return true;
        }
        return false;
    };
    Parser.prototype.parseSubCommands = function (cmd) {
        if (this.hasSubCommands(cmd)) {
            var subCommands = cmd.match(regex_1.REGEX_SUBCOMMANDS);
            console.log(subCommands);
            return subCommands;
        }
    };
    Parser.prototype.parseName = function (cmd) {
        if (this.hasArgs(cmd)) {
            var matches = cmd.match(regex_1.REGEX_MATCH_TYPE_HAS_ARGS);
            if (matches && matches.length > 0) {
                console.log('Parser.parseName.hasArgs.matches', matches);
                return matches.map(function (match) {
                    return match.split(regex_1.REGEX_START_BRACKET)[0].substr(1, match.split(regex_1.REGEX_START_BRACKET)[0].length);
                });
            }
        }
        else {
            var matches = cmd.match(regex_1.REGEX_MATCH_TYPE);
            if (matches && matches.length > 0) {
                console.log('Parser.parseName.matches', matches);
                return matches.map(function (match) {
                    return match.substr(1, match.length);
                }).join('');
            }
        }
    };
    Parser.prototype.getObjectType = function (item) {
        if (typeof item === 'object') {
            if (JSON.stringify(item).indexOf('[') >= 0 && JSON.stringify(item).indexOf(']') >= 0) {
                return types_1.ObjectType.ARRAY;
            }
            return types_1.ObjectType.OBJECT;
        }
        if (typeof item === 'string') {
            if (item.indexOf('__') >= 0) {
                return types_1.ObjectType.HIDDEN;
            }
            if (item.indexOf("@") >= 0) {
                if (item.indexOf('@repeat') >= 0) {
                    return types_1.ObjectType.REPEAT;
                }
                return types_1.ObjectType.COMMAND;
            }
            if (item.indexOf("#") >= 0) {
                return types_1.ObjectType.POINTER;
            }
            if (item.indexOf("&") >= 0) {
                return types_1.ObjectType.GLOBAL;
            }
            if ((item.indexOf('^') >= 0) || (item.indexOf('$parent.') >= 0)) {
                return types_1.ObjectType.PARENT;
            }
        }
    };
    Parser.prototype.parseArgs = function (cmd) {
        var matches = cmd.match(regex_1.REGEX_HAS_ARGS);
        if (matches && matches.length > 0) {
            console.log("Matches", matches);
            return matches[0].split(regex_1.REGEX_COMMA).map(function (arg) {
                console.log("Matches arg", arg);
                var cleanArg = arg.replace(regex_1.REGEX_ARGS_CONTENT, '');
                console.log("Matches clean arg", cleanArg.trim());
                return cleanArg.trim();
            });
        }
        return [];
    };
    Parser.prototype.parseCommand = function (cmd) {
        var commandObject = new commandObject_1.CommandObject();
        commandObject.type = this.getObjectType(cmd);
        switch (commandObject.type) {
            case types_1.ObjectType.COMMAND:
            case types_1.ObjectType.POINTER:
            case types_1.ObjectType.PARENT:
            case types_1.ObjectType.HIDDEN:
                commandObject.name = this.parseName(cmd);
                commandObject.hasArgs = this.hasArgs(cmd);
                commandObject.args = this.parseArgs(cmd);
                commandObject.manyCommands = this.hasSubCommands(cmd);
                commandObject.origin = cmd;
                commandObject.subCommands = this.parseSubCommands(cmd);
                break;
            case types_1.ObjectType.OBJECT:
                commandObject.name = 'object@' + commandObject.origin;
                commandObject.origin = cmd;
                break;
            case types_1.ObjectType.ARRAY:
                commandObject.origin = cmd;
                commandObject.name = 'array@' + commandObject.origin;
                break;
            case types_1.ObjectType.REPEAT:
                commandObject.name = this.parseName(cmd);
                commandObject.hasArgs = this.hasArgs(cmd);
                commandObject.args = this.parseArgs(cmd);
                break;
        }
        console.log("Traverse.parseCommand", commandObject);
        return commandObject;
    };
    return Parser;
}());
exports["default"] = Parser;
;
