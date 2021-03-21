import prompts from "prompts";

interface Commands {
    [key: string]: () => any;
}

let commands: Commands = {
    exit: () => process.exit(0),
};

setTimeout(async () => {
    console.log("Welcome to the David Bowie Terminal Interface!".yellow);
    while (true) {
        const response = await prompts({
            type: "text",
            name: "res",
            message: "BowieTerm",
            validate: (res) =>
                Object.keys(commands).includes(res)
                    ? true
                    : `${res} is not a valid command`.red,
        });

        commands[response.res]();
    }
}, 1000);
