# David Bowie's Architecture

### Overview

Here is an overview of what each folder under src/ is used for

-   commands - Each file in this folder represents a regular non-slash command

-   interactions - Each file in this folder represents a slash command.

-   daemons - This folder contains files that are ran on startup and initiate connections to the backend or launch the interactions endpoint

-   handlers - This folder contains files that handle discord.js events and slash commands

-   types - Contains the typescript types

-   utils - Contains the shared utility functions for the bot

### Interactions

This bot uses an outgoing webhook to an express server to manage reactions instead of connecting to the gateway through a websocket connection.
