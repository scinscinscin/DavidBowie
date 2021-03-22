import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
    @PrimaryKey()
    userID: string;

    @Property()
    nsfw: boolean;
}
