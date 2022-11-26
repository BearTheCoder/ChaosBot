// *****     Package Imports     *****
require('dotenv').config; // Railway required package for environment variables
const {
  ActionRowBuilder,
  ModalBuilder,
  REST,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionFlagsBits,
  Routes,
} = require("discord.js");

// *****    Exports     *****
module.exports.returnCreateCommandModal = () => {
  const modal = new ModalBuilder()
    .setCustomId("createCommandModal")
    .setTitle("Create Command!");
  const commandPermissions = new TextInputBuilder()
    .setCustomId("commandPermissions")
    .setLabel("Mod Permissions? (Yes or No)")
    .setStyle(TextInputStyle.Short);
  const commandNameInput = new TextInputBuilder()
    .setCustomId("commandName")
    .setLabel("Input Name")
    .setStyle(TextInputStyle.Short);
  const commandDescription = new TextInputBuilder()
    .setCustomId("commandDescription")
    .setLabel("Input Description")
    .setStyle(TextInputStyle.Paragraph);
  const commandInputRequired = new TextInputBuilder()
    .setCustomId("commandInputRequired")
    .setLabel("Input Required? (Yes or No)")
    .setStyle(TextInputStyle.Short);
  const commandInputName = new TextInputBuilder()
    .setCustomId("commandInputName")
    .setLabel("Command Input Name ('null' for no input)")
    .setStyle(TextInputStyle.Short);
  modal.addComponents(
    new ActionRowBuilder().addComponents(commandPermissions),
    new ActionRowBuilder().addComponents(commandNameInput),
    new ActionRowBuilder().addComponents(commandDescription),
    new ActionRowBuilder().addComponents(commandInputRequired),
    new ActionRowBuilder().addComponents(commandInputName));
  return modal;
};

module.exports.createNewCommand = modalObject => {
  new REST({ version: "10" }).setToken(process.env.myToken)
    .get(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID))
    .then((commands) => {

      if (modalObject.commandInputName !== "null") {
        const newCommand = new SlashCommandBuilder()
          .setName(modalObject.commandName)
          .setDescription(modalObject.commandDescription)
          .setDefaultMemberPermissions(modalObject.commandPermissions)
          .addStringOption(option =>
            option.setName(modalObject.commandInputName)
              .setDescription(modalObject.commandInputName)
              .setRequired(modalObject.commandInputRequired));
        commands.push(newCommand);
      }
      else {
        const newCommand = new SlashCommandBuilder()
          .setName(modalObject.commandName)
          .setDescription(modalObject.commandDescription)
          .setDefaultMemberPermissions(modalObject.commandPermissions);
        commands.push(newCommand);
      }
      setCommandsViaRest("New command created...", { body: commands, });
    })
    .catch(console.error);
};

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
  rest.delete(Routes.applicationGuildCommand(process.env.applicationID, process.env.myGuildID, interaction.options.getString('command')))
    .then(() => console.log('Successfully deleted guild command...'))
    .catch(console.error);
};

module.exports.resetCommands = interaction => {
  return new Promise((thenFunc, catchFunc) => {
    if (interaction.options.getString('password') === process.env.pass) {
      const commands = [
        new SlashCommandBuilder()
          .setName("createcommand")
          .setDescription("(MODS) Will create a public command with no functionality.")
          .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
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