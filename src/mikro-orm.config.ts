import {
    Configuration,
    Connection,
    IDatabaseDriver,
    Options,
} from "@mikro-orm/core";
import path from "path";
const { clientUrl }: { clientUrl: string } = require("../config/main.json");

export const mikro_orm_config:
    | Configuration<IDatabaseDriver<Connection>>
    | Options<IDatabaseDriver<Connection>> = {
    entities: [`${path.resolve(__dirname, "./entities")}`],
    migrations: {
        path: `${path.resolve(__dirname, "./migrations")}`,
        pattern: /^[\w-]+\d+\.[tj]s/,
    },
    dbName: "postgres",
    type: "postgresql",
    clientUrl,
};
