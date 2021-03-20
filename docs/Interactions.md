# How Bowie handles interactions

Interactions are the technical name for slash commands

### On startup

-   An Express server is started which the Discord API would send a POST request to whenever someone uses a slash command.

-   The [interactionsLoader](../src/daemons/interactionsLoader.ts) loads all the interactions in [interactions/](../src/interactions/) and compares them to a list of commands that the Discord API returns. It then takes takes the measure to create, edit, or remove commands as needed.

### User runs a command

The Express server calls the [interactionsHandler](../src/handlers/interactionsHandler.ts), which looks at the request's body and calls the appropriate interaction's function. The function then returns a response that is sent to the handler, then express, which is stringified then sent to Discord in the response.

### Interaction Flow

![Interactions flow](./assets/interactions_arch.png?raw=true "Diagram of interactions")
