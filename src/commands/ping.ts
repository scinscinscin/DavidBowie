import { CommandInput, CommandOutput, Command } from "../types/CommandTypes";

function ping({ messageObject }: CommandInput): CommandOutput {
    let ping = Date.now() - messageObject.createdTimestamp;
    return {
        color: `green`,
        fields: [
            {
                body: `**${ping}ms**`,
                title: "Ping",
            },
        ],
    };
}

let command: Command = {
    cmd: ping,
    helpMsg: "Check the bot's ping",
    category: "Utilities",
    requiresAdmin: true,
    sendsMessage: true,
};

module.exports = command;
