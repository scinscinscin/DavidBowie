import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Server {
    @PrimaryKey()
    serverID: number;

    @Property()
    prefix: string;

    @Property()
    modmail: string;
}
