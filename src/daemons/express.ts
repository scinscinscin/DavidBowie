import {
    DiscordAPIRequest,
    DiscordAPIResponse,
} from "../types/InteractionTypes";
import { interactionsHandler } from "../handlers/interactionsHandler";

import express, { Express } from "express";
import bodyParser from "body-parser";
import nacl from "tweetnacl";

const { pubKey }: { pubKey: string } = require("../../config/token.json");
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

global["expressApp"] = app;

const port: number = 8080;
app.listen(port, () => {
    console.log(`Express started on port ${port}`);
});

app.post("/", async (req, res) => {
    const body: DiscordAPIRequest = req.body;
    const timestamp = req.get("X-Signature-Timestamp");
    if (timestamp === undefined) return res.sendStatus(400); // request does not match discord api

    const isVerified: boolean = nacl.sign.detached.verify(
        Buffer.from(timestamp + JSON.stringify(body)),
        Buffer.from(req.get("X-Signature-Ed25519")!, "hex"),
        Buffer.from(pubKey, "hex")
    );

    if (!isVerified) {
        return res.status(401).end("invalid request signature");
    }

    // Verified
    if (body.data === undefined) {
        res.status(200).end('{"type":1}');
        return;
    }

    const response: DiscordAPIResponse = await interactionsHandler(body);
    res.status(200).end(JSON.stringify(response));
});
