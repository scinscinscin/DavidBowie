import path from "path";
import { MikroORM } from "@mikro-orm/core";

(async () => {
    const orm = await MikroORM.init({
        entities: [`${path.resolve(__dirname, "../entities")}`],
        migrations: {
            path: `${path.resolve(__dirname, "../migrations")}`,
            pattern: /^[\w-]+\d+\.[tj]s$/,
        },
        dbName: "postgres",
        type: "postgresql",
        clientUrl: "postgresql://postgres:password@localhost:5432",
    });

    const migrator = orm.getMigrator();
    await migrator.up(); // runs migrations up to the latest
    await orm.close(true);
})();
