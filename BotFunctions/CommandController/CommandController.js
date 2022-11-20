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
    new ActionRowBuilder().addComponents(commandNameInput),
    new ActionRowBuilder().addComponents(commandDescription),
    new ActionRowBuilder().addComponents(commandPermissions),
    new ActionRowBuilder().addComponents(commandInputName),
    new ActionRowBuilder().addComponents(commandInputRequired));
  return modal;
};

module.exports.createNewCommand = modalObject => {
  new REST({ version: "10" }).setToken(process.env.myToken)
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((commands) => {

      let recreatedCommands = recreateExistingCommands(commands);

      // Create New Command
      if (commandInputName !== "null") {
        recreatedCommands.push(new SlashCommandBuilder()
          .setName(modalObject.commandName)
          .setDescription(modalObject.commandDescription)
          .setDefaultMemberPermissions(modalObject.commandPermissions)
          .addStringOption(option =>
            option.setName(modalObject.commandInputName)
              .setDescription(modalObject.commandInputName)
              .setRequired(modalObject.commandInputRequired)));
      }
      else {
        recreatedCommands.push(new SlashCommandBuilder()
          .setName(modalObject.commandName)
          .setDescription(modalObject.commandDescription)
          .setDefaultMemberPermissions(modalObject.commandPermissions));
      }
      const JSONCommands = recreatedCommands.map((command) => command.toJSON());
      setCommandsViaRest("New command created...", { body: JSONCommands, });
    })
    .catch(console.error);
};

module.exports.listCommands = function () {
  console.log(`I am a function`);
  // return new Promise((thenFunc, catchFunc) => {
  //   try {
  //     const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  //     rest
  //       .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
  //       .then((data) => {
  //         let dataString = null;
  //         for (let i = 0; i < data.length; i++) {
  //           dataString = dataString === null ?
  //             `Name: ${data[i].name} ID: ${data[i].id} \n` :
  //             `${dataString}Name: ${data[i].name} ID: ${data[i].id} \n`;
  //         }
  //         thenFunc(dataString);
  //       })
  //       .catch(console.error);
  //   }
  //   catch (ex) {
  //     catchFunc(`Error retrieving commands...`);
  //   }
  // });
};

module.exports = function deleteCommandByID(interaction) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest.delete(Routes.applicationGuildCommand(process.env.myClientID, process.env.myGuildID, interaction.options.getString('command')))
    .then(() => console.log('Successfully deleted guild command...'))
    .catch(console.error);
};

module.exports = function resetCommands(interaction) {
  return new Promise((thenFunc, catchFunc) => {
    if (interaction.options.getString('password') === 'allow chaos') {
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
      ].map((command) => command.toJSON());
      const logMessage = "Base command created, all other commands deleted...";
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
function recreateExistingCommands(commands) {
  let recreatedCommands = [];
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].options === undefined) {
      recreatedCommands.push(new SlashCommandBuilder()
        .setName(commands[i].name)
        .setDescription(commands[i].description)
        .setDefaultMemberPermissions(commands[i].default_member_permissions));
    }
    else {
      try {
        const isRequired = commands[i].options[0].required === undefined ? false : true;
        recreatedCommands.push(new SlashCommandBuilder()
          .setName(commands[i].name)
          .setDescription(commands[i].description)
          .setDefaultMemberPermissions(commands[i].default_member_permissions)
          .addStringOption(option =>
            option.setName(commands[i].options[0].name)
              .setDescription(commands[i].options[0].description)
              .setRequired(isRequired)));
      }
      catch (err) {
        console.log(commands[i].name);
        console.log(err);
      }
    }
  }
  return recreatedCommands;
}


function setCommandsViaRest(logMessage, Commands) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .put(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID), Commands)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}