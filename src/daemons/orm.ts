import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { Server } from "../entities/Server";
import { MigrationResult } from "@mikro-orm/migrations";

(async () => {
    const orm = await MikroORM.init({
        entities: [`${path.resolve(__dirname, "../entities")}`],
        migrations: {
            path: `${path.resolve(__dirname, "../migrations")}`,
            pattern: /^[\w-]+\d+\.[tj]s/,
        },
        dbName: "postgres",
        type: "postgresql",
        clientUrl: "postgresql://postgres:password@localhost:5432",
    });

    console.log("[NORMAL] Connected to PostgreSQL".green);
    if (process.env.CREATE_MIGRATION !== undefined) {
        let migration: MigrationResult = await orm
            .getMigrator()
            .createMigration();
        console.log(
            "[NORMAL] Migration saved to:".green,
            path.resolve(__dirname, "../migrations/", migration.fileName)
        );
    }

    const bruh = orm.em.create(Server, {
        modmail: "test",
        prefix: "!",
        serverID: 10,
    });
    await orm.em.persistAndFlush(bruh);
})();
