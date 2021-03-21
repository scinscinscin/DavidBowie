import { Message } from "discord.js";
import { CommandInput, CommandOutput } from "../types/CommandTypes";
import { commands } from "../daemons/commandsLoader";
import { messageBuilder } from "../utils/messageBuilder";
const { client } = global;

client.on(
    "message",
    async (msg: Message): Promise<void> => {
        let contents: string = msg.content;
        let prefix: string = "!"; // get prefix from db
        if (!contents.startsWith(prefix) || contents === prefix) {
            return;
        }

        // argument parsing
        let args: string[] = contents
            .substring(prefix.length) // remove prefix
            .split(" ") // split based on spaces
            .filter((str) => {
                // remove elements that are purely whitespace
                return /\S/.test(str);
            });

        let command = args.shift()!;

        if (!Object.keys(commands).includes(command)) {
            return; // command does not exist
        }

        let authorName: string = msg.author.username;
        let channel = msg.channel;

        let params: CommandInput = {
            messageObject: msg,
            guild: msg.guild,
            channelID: msg.channel.id,
            channel,
            authorID: msg.author.id,
            authorName,
            args,
        };

        let response: CommandOutput = await commands[command]["cmd"](params);
        if (commands[command].sendsMessage === false) return; // command does not send anything

        if (response === undefined || response.fields.length === 0) {
            response = {
                color: "red",
                fields: [
                    {
                        title: "An error",
                        body: "An unexpected error has occured",
                    },
                ],
            };
        }

        let sentMessage: Message = await channel.send(
            messageBuilder(response, authorName)
        );

        if (commands[command]["callback"] !== undefined) {
            commands[command]["callback"]!(sentMessage);
        }
    }
);
