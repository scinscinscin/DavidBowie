import { Client, ClientApplication, ClientUser } from "discord.js";
import { Express } from "express";
import { SlashCommands } from "./InteractionTypes";
declare global {
    namespace NodeJS {
        interface Global {
            bot: ClientUser | null;
            client: Client;
            creator: ClientApplication;
            expressApp: Express;
            slashCommands: SlashCommands;
        }
    }
}
