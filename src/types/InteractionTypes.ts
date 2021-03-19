import { CommandCategory } from "./CommandTypes";

export interface DiscordAPIRequest {
    application_id: string;
    channel_id: string;
    data: {
        id: string;
        name: string;
    };
    guild_id: string;
    id: string;
    member: {
        deaf: boolean;
        is_pending: boolean;
        joined_at: Date;
        mute: boolean;
        nick?: any;
        pending: boolean;
        permissions: string;
        premium_since?: any;
        roles: any[];
        user: {
            avatar: string;
            discriminator: string;
            id: string;
            public_flags: number;
            username: string;
        };
    };
    token: string;
    type: number;
    version: number;
}

export interface DiscordAPIResponse {
    type: number;
    data: {
        tts: boolean;
        content: string;
        embeds: any[];
        allowed_mentions: {
            parse: any[];
        };
    };
}

export interface SlashCommand {
    cmd: (
        params: DiscordAPIRequest
    ) => Promise<DiscordAPIResponse> | DiscordAPIResponse;
    category: CommandCategory;
    helpMsg: string;
    requiresAdmin: boolean;
    sendsMessage: boolean;
}

export interface SlashCommands {
    [key: string]: SlashCommand;
}
