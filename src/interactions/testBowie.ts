import { DiscordAPIResponse, SlashCommand } from "src/types/InteractionTypes";

async function testbowie(): Promise<DiscordAPIResponse> {
    return {
        type: 4,
        data: {
            tts: false,
            content: "Congrats on sending your command!",
            embeds: [],
            allowed_mentions: { parse: [] },
        },
    };
}

let command: SlashCommand = {
    cmd: testbowie,
    category: "Utilities",
    helpMsg: "This is the test command for the David Bowie Bot",
    requiresAdmin: false,
    sendsMessage: true,
};

module.exports = command;
