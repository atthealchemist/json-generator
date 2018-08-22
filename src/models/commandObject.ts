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

  }

};