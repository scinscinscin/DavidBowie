import prompts from "prompts";

interface Commands {
    [key: string]: () => any;
}

let commands: Commands = {
    exit: () => process.exit(0),
};

setTimeout(async () => {
    console.log("Welcome to the David Bowie Terminal Interface!");
    while (true) {
        const response = await prompts({
            type: "text",
            name: "res",
            message: "What command do you want to run?",
            validate: (res) =>
                Object.keys(commands).includes(res)
                    ? true
                    : `${res} is not a valid command`,
        });

        console.log(`OK, running ${response.res}`);
        commands[response.res]();
    }
}, 1000);
