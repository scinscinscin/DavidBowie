import Discord, { DMChannel, NewsChannel, TextChannel } from "discord.js";
const colors = require("../../config/main.json").colors;
import { CommandOutput } from "src/types/CommandTypes";

function sendMsg(
    response: CommandOutput,
    author: string,
    channel: TextChannel | DMChannel | NewsChannel
) {
    let { color, fields } = response; // Get the color, title, and message from the response object
    let embed = new Discord.MessageEmbed()
        .setColor(colors[color])
        .setFooter(`Requested by: ${author}`)
        .setTimestamp();

    // Add fields
    fields.forEach(({ title, body }) => {
        embed.addField(title, body);
    });
    channel.send(embed);
}

module.exports = sendMsg;
