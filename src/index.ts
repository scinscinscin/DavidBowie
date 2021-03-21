import fs from "fs";
import Discord, { Client } from "discord.js";
import "colors";

const { token }: { token: string } = require("../config/token.json");
const client: Client = (global["client"] = new Discord.Client());

client.on("ready", async () => {
    console.log(`[NORMAL] Logged in to Discord!`.green);
    global["creator"] = await client.fetchApplication();
    global["bot"] = await client.user;

    // Load daemons
    fs.readdirSync("./src/daemons", { withFileTypes: true })
        .filter((ent) => ent.isFile())
        .map((file) => file.name.slice(0, -3))
        .forEach((name) => require(`./daemons/${name}`));

    // Load event handlers
    fs.readdirSync("./src/handlers", { withFileTypes: true })
        .filter((ent) => ent.isFile())
        .map((file) => file.name.slice(0, -3))
        .forEach((name) => require(`./handlers/${name}`));
});

client.login(token);
