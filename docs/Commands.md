# How Bowie handles commands

Discord.js fires a "message" event whenever someone sends a message.

Bowie then handles the contents of the message accordingly by parsing the message and running the command if it exists.

### How are commands stored

Each file under the [commands/](../src/commands/) folder represents a single command.

The files each export an object that follows the `Command` interface.

This object contains information about the command like its' description and if it sends a message or requires admin permissions

The object also contains functions that a handler could call. For example, the [messageHandler](../src/handlers/messageHandler.ts) calls the export's cmd property while the [reactionHandler](../src/handlers/reactionHandler.ts) calls the object's reactionHandler property
