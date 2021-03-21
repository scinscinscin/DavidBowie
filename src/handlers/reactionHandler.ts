import { Client, MessageReaction, PartialUser, User } from "discord.js";
import { commands } from "../daemons/commandsLoader";
import { redisGet } from "../daemons/redis";

const client: Client = global["client"];
client.on("messageReactionAdd", async (reaction, user) => {
    reactionHandler(reaction, user, "added");
});

client.on("messageReactionRemove", async (reaction, user) => {
    reactionHandler(reaction, user, "removed");
});

async function reactionHandler(
    reaction: MessageReaction,
    user: User | PartialUser,
    event: "added" | "removed"
): Promise<void> {
    if (reaction.me) return;
    let { ok, value } = await redisGet(reaction.message.id);
    if (ok === false || value === undefined) return; // bot is not listening for this message
    commands[value]["reactionHandler"]!(reaction, user, event);
}
