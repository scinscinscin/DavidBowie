import fs from "fs";
import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { MigrationResult } from "@mikro-orm/migrations";
import { mikro_orm_config } from "../mikro-orm.config";
import "colors";

(async () => {
    const migrationsPath = path.resolve(__dirname, "../migrations");
    const orm = await MikroORM.init(mikro_orm_config);

    // create migrations directory if it does not exist
    if (!fs.existsSync(migrationsPath)) {
        fs.mkdirSync(migrationsPath);
    }

    let {
        fileName,
    }: MigrationResult = await orm.getMigrator().createMigration();
    let migrationFilename = path.resolve(__dirname, "../migrations/", fileName);
    console.log(`[NORMAL] Migration saved to: ${migrationFilename}`.green);
    process.exit(0);
})();
