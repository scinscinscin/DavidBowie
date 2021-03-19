import redis, { RedisClient } from "redis";
const client: RedisClient = redis.createClient();
client.FLUSHALL(); // rm -rf the db on startup

client.on("error", function (error) {
    console.error(error);
});

function redisSet(key: string, value: string): Promise<boolean> {
    let promise = new Promise<boolean>(function (resolve) {
        client.set(key, value, (test): void => {
            if (test !== null) {
                //an error has occured
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    return promise;
}

function redisGet(
    key: string
): Promise<{
    ok: boolean;
    value?: string;
}> {
    let promise = new Promise<{
        ok: boolean;
        value?: string;
    }>(function (resolve) {
        client.get(key, (err: Error | null, reply: string | null): void => {
            if (err !== null || reply === null) {
                resolve({
                    ok: false,
                });
            } else {
                resolve({
                    ok: true,
                    value: reply,
                });
            }
        });
    });
    return promise;
}

export { redisSet, redisGet };
