import Commands from "./commands";

import Parser from "./parser";

import { ObjectType } from "./types";

import {
  REGEX_MATCH_COMMAND,
  REGEX_MATCH_POINTER,
  REGEX_MATCH_PARENT} from "./regex";

export default class JsonGenerator {

  commands: Commands = new Commands();
  parser: Parser = new Parser();

  private processJson(json: any, parent?: any) {
    let item;

    for (let key in json) {
      item = json[key];
      console.log('ProcessJson.key', key);
      console.log('ProcessJson.value', json[key]);

      switch (this.parser.getObjectType(key)) {

        case ObjectType.HIDDEN:
          console.log('ProcessJson.ObjectType::HIDDEN.hiddenKey', key);
          delete json[key];
          break;

        case ObjectType.REPEAT:
          console.log('ProcessJson.ObjectType::REPEAT.key', key);
          let command = this.parser.parseCommand(key);
          console.log('ProcessJson.ObjectType::REPEAT.command', command);


          let arrayKey = command.args[0];
          let start = parseInt(command.args[1]);
          let end = parseInt(command.args[2]);

          let repeatCount = this.commands['number'](start, end);
          console.log("ProcessJson.ObjectType::REPEAT.repeatCount", repeatCount);
          console.log("ProcessJson.ObjectType::REPEAT.repeatedItem", json[key]);

          console.log(`ProcessJson.ObjectType::REPEAT.for.item`, json[key]);
          json[arrayKey] = [];

          for (let i = 0; i < repeatCount; i++) {
            this.processJson(json[key]);
            json[arrayKey].push(json[key]);
          }

          console.log("ProcessJson.ObjectType::REPEAT.json[arrayKey]", json[arrayKey]);
          
          delete json[key];

          break;

      }

      let command = this.parser.parseCommand(item);

      console.log('ProcessJson.command', command);

      switch (command.type) {

        case ObjectType.ARRAY:
          if (typeof json[key] === 'object') {
            console.log('ProcessJson.ObjectType::ARRAY.value', json[key]);
            let array = json[key];
            console.log('ProcessJson.ObjectType::ARRAY.array', array);
            for (let item of array) {
              console.log("ProcessJson.ObjectType::ARRAY.for.item", item);
              this.processJson(item);
            }
          }
          break;

        case ObjectType.OBJECT:
          console.log("ProcessJson.ObjectType::OBJECT.value", json[key]);
          parent = json;
          this.processJson(item, parent);
          break;

        case ObjectType.COMMAND:
          console.log("ProcessJson.ObjectType::COMMAND.command", command);
          if (command.manyCommands) {
            console.log('ProcessJson.ObjectType::COMMAND.manyCommands', command);
          }

          if (command.hasArgs) {
            json[key] = this.commands[command.name](...command.args);
          } else {
            let matches = command.origin.match(REGEX_MATCH_COMMAND);
            if(matches && matches.length > 0) {
              json[key] = command.origin.replace(REGEX_MATCH_COMMAND, this.commands[command.name]());
            }
          }


          break;

        case ObjectType.POINTER:
          console.log("ProcessJson.ObjectType::POINTER.value", json[key]);
          let matches = json[key].match(REGEX_MATCH_POINTER);
          if (matches && matches.length > 0) {
            json[key] = json[key].replace(REGEX_MATCH_POINTER, pointer => {
              let pointerKey = this.parser.parseName(pointer);
              console.log('ProcessJson.ObjectType::POINTER.replace.pointerKey', pointerKey);
              return json[pointerKey];
            });
          } else {
            console.log('ProcessJson.ObjectType::POINTER.value => NOT_MATCH', json[key]);
          }
          break;

        case ObjectType.PARENT:
          console.log("ProcessJson.ObjectType::PARENT.value", json[key]);
          json[key] = json[key].replace(REGEX_MATCH_PARENT, mom => {
            let parentKey = mom.replace('^', '');
            console.log('ProcessJson.ObjectType::PARENT.parentKey', parentKey);
            console.log('ProcessJson.ObjectType::PARENT.parentVal', parent[parentKey]);
            return parent[parentKey];
          });
          break;

      }

    }
  }

  public generateJson(document: string): string {

    let json = JSON.parse(document);
    console.log("GenerateJson.json", json);

    this.processJson(json);

    return JSON.stringify(json, null, 2);
  }
}
