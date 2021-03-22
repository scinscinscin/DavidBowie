import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { Client, ClientApplication, ClientUser } from "discord.js";
import http from "http";
import { SlashCommands } from "./InteractionTypes";

declare global {
    namespace NodeJS {
        interface Global {
            bot: ClientUser | null;
            client: Client;
            creator: ClientApplication;
            expressServer: http.Server;
            orm: MikroORM<IDatabaseDriver<Connection>>;
            slashCommands: SlashCommands;
        }
    }
}
