import { ObjectType } from "./types";
import { CommandObject } from "./commandObject";
import {
  REGEX_MATCH_COMMAND,
  REGEX_MATCH_POINTER,
  REGEX_MATCH_TYPE,
  REGEX_MATCH_TYPE_HAS_ARGS,
  REGEX_HAS_ARGS,
  REGEX_ARGS_CONTENT,
  REGEX_START_BRACKET,
  REGEX_COMMA,
  REGEX_SUBCOMMANDS
} from "./regex";

export default class Parser {

  hasArgs(cmd: string): boolean {
    let matches = cmd.match(REGEX_HAS_ARGS);
    if (matches && matches.length > 0) {
      return true;
    }
    return false;
  }

  hasSubCommands(cmd: string): boolean {
    let matches = cmd.match(REGEX_SUBCOMMANDS);
    if (matches && matches.length > 1) {
      return true;
    }
    return false;
  }

  parseSubCommands(cmd: string) {
    if (this.hasSubCommands(cmd)) {
      let subCommands = cmd.match(REGEX_SUBCOMMANDS);
      console.log(subCommands);
      return subCommands;
    }
  }

  parseName(cmd: string) {
    if (this.hasArgs(cmd)) {
      let matches = cmd.match(REGEX_MATCH_TYPE_HAS_ARGS);
      if(matches && matches.length > 0) {
        console.log('Parser.parseName.hasArgs.matches', matches);
        return matches.map(match => {
          return match.split(REGEX_START_BRACKET)[0].substr(1, match.split(REGEX_START_BRACKET)[0].length);
        })
      }
    } else {
      let matches = cmd.match(REGEX_MATCH_TYPE);
      if (matches && matches.length > 0) {
        console.log('Parser.parseName.matches', matches);
        return matches.map(match => {
          return match.substr(1, match.length);
        }).join('');
      }
    }
  }

  getObjectType(item: any) {

    if (typeof item === 'object') {
      if (JSON.stringify(item).indexOf('[') >= 0 && JSON.stringify(item).indexOf(']') >= 0) {
        return ObjectType.ARRAY;
      }
      return ObjectType.OBJECT;
    }

    if (typeof item === 'string') {
      if (item.indexOf('__') >= 0) {
        return ObjectType.HIDDEN;
      }

      if (item.indexOf("@") >= 0) {
        if (item.indexOf('@repeat') >= 0) {
          return ObjectType.REPEAT;
        }
        return ObjectType.COMMAND;
      }

      if (item.indexOf("#") >= 0) {
        return ObjectType.POINTER;
      }

      if (item.indexOf("&") >= 0) {
        return ObjectType.GLOBAL;
      }

      if ((item.indexOf('^') >= 0) || (item.indexOf('$parent.') >= 0)) {
        return ObjectType.PARENT;
      }
    }

  }

  parseArgs(cmd: string) {
    let matches = cmd.match(REGEX_HAS_ARGS);
    if (matches && matches.length > 0) {
      console.log("Matches", matches);
      return matches[0].split(REGEX_COMMA).map(arg => {
        console.log("Matches arg", arg);
        let cleanArg = arg.replace(REGEX_ARGS_CONTENT, '');
        console.log("Matches clean arg", cleanArg.trim());
        return cleanArg.trim();
      });
    }
    return [];
  }

  parseCommand(cmd: string) {

    let commandObject = new CommandObject();
    commandObject.type = this.getObjectType(cmd);

    switch (commandObject.type) {
      case ObjectType.COMMAND:
      case ObjectType.POINTER:
      case ObjectType.PARENT:
      case ObjectType.HIDDEN:
        commandObject.name = this.parseName(cmd);
        commandObject.hasArgs = this.hasArgs(cmd);
        commandObject.args = this.parseArgs(cmd);
        commandObject.manyCommands = this.hasSubCommands(cmd);
        commandObject.origin = cmd;
        commandObject.subCommands = this.parseSubCommands(cmd);
        break;
      case ObjectType.OBJECT:
        commandObject.name = 'object@' + commandObject.origin;
        commandObject.origin = cmd;
        break;
      case ObjectType.ARRAY:
        commandObject.origin = cmd;
        commandObject.name = 'array@' + commandObject.origin;
        break;
      case ObjectType.REPEAT:
        commandObject.name = this.parseName(cmd);
        commandObject.hasArgs = this.hasArgs(cmd);
        commandObject.args = this.parseArgs(cmd);
        break;

    }



    console.log("Traverse.parseCommand", commandObject);

    return commandObject;

  }

};