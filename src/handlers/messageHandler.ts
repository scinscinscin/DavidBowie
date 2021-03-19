import fs from "fs";
import { Message } from "discord.js";
import {
    Command,
    CommandInput,
    CommandOutput,
    Commands,
} from "../types/CommandTypes";
const { client } = global;
const sendMsg = require("../utils/sendMsg");

//load commands
const commands: Commands = {};
fs.readdirSync("./src/commands/", { withFileTypes: true })
    .filter((ent) => ent.isFile())
    .map((file) => file.name.slice(0, -3))
    .forEach((cmd) => {
        let command: Command = require(`../commands/${cmd}`);
        commands[command.cmd.name] = command;
    });

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

        if (
            (response === undefined || response.fields.length === 0) &&
            commands[command].sendsMessage === true
        ) {
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

        sendMsg(response, authorName, channel);
    }
);
