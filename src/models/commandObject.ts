import { ObjectType } from "./types";

export class CommandObject {
  name: string;
  hasArgs: boolean;
  type: ObjectType;
  args: Array<any>;
  origin: string;
  key: string;
  manyCommands: boolean;
  subCommands: any;

  constructor() {
    this.name = "";
    this.hasArgs = false;
    this.type = ObjectType.COMMAND;
    this.args = [] as any;
    this.key = "key";
    this.manyCommands = false;
    this.origin = "@command";
    this.subCommands = {};
  }
}
