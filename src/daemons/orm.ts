import { MikroORM } from "@mikro-orm/core";
import { mikro_orm_config } from "src/mikro-orm.config";

(async () => {
    global["orm"] = await MikroORM.init(mikro_orm_config);
    console.log("[NORMAL] Connected to PostgreSQL".green);
})();
