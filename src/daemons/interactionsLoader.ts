import fs from "fs";
import { DiscordInteractions, ApplicationCommand } from "slash-commands";
import { SlashCommand, SlashCommands } from "src/types/InteractionTypes";

const {
    token,
    pubKey,
}: { token: string; pubKey: string } = require("../../config/token.json");

// Create interactions client
const slash = new DiscordInteractions({
    applicationId: global["bot"]!.id,
    authToken: token,
    publicKey: pubKey,
});

let existingCommands: ApplicationCommand[] = [];
let slashCommands: SlashCommands = {};
(async () => {
    existingCommands = await slash.getApplicationCommands(); // Get existing commands from Discord
    fs.readdirSync("./src/interactions", { withFileTypes: true }) // Load commands locally
        .filter((ent) => ent.isFile())
        .map((cmd) => cmd.name.slice(0, -3))
        .forEach((cmd) => {
            let command: SlashCommand = require(`../interactions/${cmd}`);
            slashCommands[command.cmd.name] = command;
        });

    existingCommands.forEach(async ({ name, id, description }) => {
        if (!Object.keys(slashCommands).includes(name)) {
            // Command has been deleted
            await slash.deleteApplicationCommand(id);
            console.log(name, "slash command has been deleted");
        } else if (slashCommands[name]["helpMsg"] !== description) {
            // Command has been edited locally
            // Change the command on discord's side to new command
            await slash.createApplicationCommand(
                {
                    name: name,
                    description: slashCommands[name]["helpMsg"],
                },
                undefined,
                id
            );
        }
    });

    let existingCommandNames: string[] = existingCommands.map(
        (cmd) => cmd.name
    );
    Object.keys(slashCommands).forEach(async (cmdName) => {
        if (!existingCommandNames.includes(cmdName)) {
            // Command does not exist on server side and must be created
            await slash.createApplicationCommand({
                name: cmdName,
                description: slashCommands[cmdName]["helpMsg"],
            });
        }
    });
    global["slashCommands"] = slashCommands;
})();
