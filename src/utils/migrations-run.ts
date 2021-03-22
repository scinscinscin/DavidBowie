import { MikroORM } from "@mikro-orm/core";
import { mikro_orm_config } from "../mikro-orm.config";
import "colors";

(async () => {
    const orm = await MikroORM.init(mikro_orm_config);

    const migrator = orm.getMigrator();
    await migrator.up(); // runs migrations up to the latest
    await orm.close(true);
})();
