import fs from "fs";
import {
    CommandOutput,
    Command,
    Commands,
    CommandCategory,
    Field,
} from "../types/CommandTypes";

// Get commands from files
let commands: Commands = {};
fs.readdirSync("./src/commands/", { withFileTypes: true })
    .filter((ent) => ent.isFile())
    .map((file) => file.name.slice(0, -3))
    .filter((file) => file !== "help") // don't want to import self
    .forEach((file) => {
        commands[file] = require(`./${file}`);
    });

// Get the different categories
let categories: CommandCategory[] = [];
Object.values(commands).forEach(({ category }) => {
    if (!categories.includes(category)) {
        categories.push(category);
    }
});

function help(): CommandOutput {
    let fields: Field[] = [];
    categories.forEach((category) => {
        let body: string = "**";

        Object.values(commands)
            .filter((cmd) => cmd.category === category)
            .forEach((cmd) => {
                body += `${cmd.cmd.name} - ${cmd.helpMsg}`;

                // Say require admin if it actually does require admin
                if (cmd.requiresAdmin) {
                    body += " - Requires admin";
                }
                body += "\n";
            });

        if (category === "Utilities") {
            body += "help - Display this help message\n";
        }

        body += "**";
        fields.push({ title: category, body });
    });

    return { color: `green`, fields };
}

let command: Command = {
    cmd: help,
    helpMsg: "Display this help message",
    category: "Utilities",
    sendsMessage: true,
};

module.exports = command;
