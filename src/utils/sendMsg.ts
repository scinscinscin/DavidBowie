import { CommandOutput } from "src/types/CommandTypes";
import Discord, {
    DMChannel,
    NewsChannel,
    TextChannel,
    Message,
} from "discord.js";

const colors = require("../../config/main.json").colors;

async function sendMsg(
    response: CommandOutput,
    author: string,
    channel: TextChannel | DMChannel | NewsChannel
): Promise<Message> {
    let { color, fields } = response; // Get the color, title, and message from the response object
    let embed = new Discord.MessageEmbed()
        .setColor(colors[color])
        .setFooter(`Requested by: ${author}`)
        .setTimestamp();

    // Add fields
    fields.forEach(({ title, body }) => {
        embed.addField(title, body);
    });
    return await channel.send(embed);
}

module.exports = sendMsg;
