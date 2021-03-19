import {
    DMChannel,
    Guild,
    Message,
    NewsChannel,
    TextChannel,
} from "discord.js";

export type CommandCategory = "Utilities" | "Fun" | "Moderation";

export interface Command {
    cmd: (params: CommandInput) => Promise<CommandOutput> | CommandOutput;
    category: CommandCategory;
    helpMsg: string;
    requiresAdmin: boolean;
    sendsMessage: boolean;
}

export interface Commands {
    [key: string]: Command;
}
export interface CommandInput {
    args: string[];
    authorID: string;
    authorName: string;
    channelID: string;
    channel: TextChannel | DMChannel | NewsChannel;
    guild: Guild | null;
    messageObject: Message;
}

export interface Field {
    title: string;
    body: string;
}
export interface CommandOutput {
    color: "green" | "yellow" | "orange" | "red";
    fields: Field[];
}
