import { User } from "discord.js";
import { CommandOutput, Command, Field } from "../types/CommandTypes";

function info(): CommandOutput {
    let fields: Field[] = [];
    let creator = global["creator"].owner as User;
    let bot = global["bot"]!;

    fields.push({
        title: `Owner`,
        body: `**Username: ${creator.username}#${creator.discriminator}
			ID: ${creator.id}**`,
    });

    fields.push({
        title: `Bot Info`,
        body: `**Username: ${bot.username}#${bot.discriminator}
			ID: ${bot.id}**`,
    });

    fields.push({
        title: `Author`,
        body: `**Username: scinorandex#9710
		GitHub: https://github.com/scinscinscin**`,
    });

    return {
        color: "green",
        fields,
    };
}

let command: Command = {
    cmd: info,
    helpMsg: "Display this help message",
    category: "Utilities",
    requiresAdmin: false,
    sendsMessage: true,
};

module.exports = command;
