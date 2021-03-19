import {
    DiscordAPIRequest,
    DiscordAPIResponse,
} from "src/types/InteractionTypes";

export async function interactionsHandler(
    body: DiscordAPIRequest
): Promise<DiscordAPIResponse> {
    let slashCommands = global["slashCommands"];
    let cmdName = body.data.name;
    let response: DiscordAPIResponse = await slashCommands[cmdName]["cmd"](
        body
    );

    // Handle undefined responses
    if (response === undefined) {
        response = {
            type: 4,
            data: {
                tts: false,
                content: "An error has occured while processing your command",
                embeds: [],
                allowed_mentions: { parse: [] },
            },
        };
    }

    return response;
}
