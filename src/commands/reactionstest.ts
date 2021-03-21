import Discord, {
    Message,
    MessageReaction,
    PartialUser,
    User,
} from "discord.js";
import { Command, CommandOutput } from "src/types/CommandTypes";
import { redisSet } from "../daemons/redis";

let messages: Message[] = [];

function reactionsTest(): CommandOutput | Promise<CommandOutput> {
    return {
        color: `green`,
        fields: [
            {
                body: `**This is a command that tests the reaction handler**`,
                title: "Reaction handler test",
            },
        ],
    };
}

async function callback(message: Message): Promise<void> {
    message.react("😳");
    messages.push(message);
    redisSet(message.id, command.cmd.name);
}

async function reactionHandler(
    reaction: MessageReaction,
    user: User | PartialUser,
    event: "added" | "removed"
): Promise<void> {
    let msg = messages.filter((msg) => msg.id === reaction.message.id)[0];
    msg.edit(
        new Discord.MessageEmbed()
            .setColor("#a4d05f")
            .addField(
                `Change has occured`,
                `${user.username} ${event} a ${reaction.emoji.name} emoji`
            )
    );
}

let command: Command = {
    cmd: reactionsTest,
    callback,
    reactionHandler,
    helpMsg: "Test the reaction component of bot",
    category: "Utilities",
    requiresAdmin: true,
    sendsMessage: true,
};

module.exports = command;
