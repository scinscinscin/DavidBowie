import fs from "fs";
import { Command, Commands } from "src/types/CommandTypes";

export const commands: Commands = {};
fs.readdirSync("./src/commands/", { withFileTypes: true })
    .filter((ent) => ent.isFile())
    .map((file) => file.name.slice(0, -3))
    .forEach((cmd) => {
        let command: Command = require(`../commands/${cmd}`);
        commands[command.cmd.name] = command;
    });
