import { CommandOutput } from "src/types/CommandTypes";
import { MessageEmbed } from "discord.js";

const colors = require("../../config/main.json").colors;

export function messageBuilder(
    response: CommandOutput,
    author: string
): MessageEmbed {
    let { color, fields } = response; // Get the color, title, and message from the response object
    let embed = new MessageEmbed()
        .setColor(colors[color])
        .setFooter(`Requested by: ${author}`)
        .setTimestamp();

    // Add fields
    fields.forEach(({ title, body }) => {
        embed.addField(title, body);
    });

    return embed;
}
