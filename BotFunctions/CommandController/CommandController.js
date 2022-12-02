// *****     Package Imports     *****
require('dotenv').config; // Railway required package for environment variables
const {
  REST,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Routes,
} = require("discord.js");

// *****    Exports     *****

module.exports.listCommands = () => {
  return new Promise((thenFunc, catchFunc) => {
    try {
      const rest = new REST({ version: "10" }).setToken(process.env.myToken);
      rest
        .get(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID))
        .then((data) => {
          let dataString = null;
          for (let i = 0; i < data.length; i++) {
            dataString = dataString === null ?
              `Name: ${data[i].name} ID: ${data[i].id} \n` :
              `${dataString} Name: ${data[i].name} ID: ${data[i].id} \n`;
          }
          thenFunc(dataString);
        })
        .catch(console.error);
    }
    catch (ex) {
      catchFunc(`Error retrieving commands...`);
    }
  });
};

module.exports.deleteCommandByID = interaction => {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest.delete(Routes.applicationGuildCommand(process.env.applicationID, process.env.myGuildID, interaction.options.getString('commandid')))
    .then(() => console.log('Successfully deleted guild command...'))
    .catch(console.error);
};

module.exports.resetCommands = interaction => {
  return new Promise((thenFunc, catchFunc) => {
    if (interaction.options.getString('password') === process.env.pass) {
      const commands = [
        new SlashCommandBuilder()
          .setName("resetcommands")
          .setDescription("(MODS - PASSWORD) Removes all functions except 'createcommand' and 'resetfunctions'.")
          .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
          .addStringOption(option =>
            option.setName("password")
              .setDescription("password")
              .setRequired(true))
      ];
      const logMessage = "Base commands created, all other commands deleted...";
      setCommandsViaRest(logMessage, { body: commands, });
      thenFunc(`All commands have been reset...`);
    }
    else {
      catchFunc(`Password is incorrect...`);
    }
  });
};

module.exports.deleteAllCommands = () => { setCommandsViaRest("All commands deleted...", { body: [], }); }; //Not Used - But Works

// *****     Internal Functions     *****
function setCommandsViaRest (logMessage, Commands) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .put(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID), Commands)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}