const enterCommandName = ""; //Must be unique
const enterCommandDesc = ""; // Only slash commands can have a description
const enterPermissions = undefined; // '0' for admins, '4' for mods, undefined for all users.
const enterType = 2; //1 for slash, 2 for user, 3 for menu
const enterOptions = [];

require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

discordClient.once("ready", () => { registerCommand(); });

function registerCommand () {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationCommands(process.env.applicationID))
    .then((commands) => {
      if (commands.find((command) => command.name === enterCommandName) === undefined) {

        commands.push({
          default_permission: true,
          default_member_permissions: enterPermissions,
          type: enterType,
          name: enterCommandName,
          name_localizations: null,
          description: enterCommandDesc,
          description_localizations: null,
          dm_permission: true,
          options: enterOptions,
        });
      }

      return rest.put(Routes.applicationCommands(process.env.applicationID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}

discordClient.login(process.env.myToken);