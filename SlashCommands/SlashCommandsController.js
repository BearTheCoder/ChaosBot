const { REST, SlashCommandBuilder, Routes, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits, Guild  } = require("discord.js");
require('dotenv').config();

function ReturnModal() {
  const modal = new ModalBuilder()
    .setCustomId("createCommandModal")
    .setTitle("Create Command!");
  const commandNameInput = new TextInputBuilder()
    .setCustomId("commandName")
    .setLabel("Input name...")
    .setStyle(TextInputStyle.Short);
  const commandDescription = new TextInputBuilder()
    .setCustomId("commandDescription")
    .setLabel("Input description...")
    .setStyle(TextInputStyle.Paragraph);
  const commandPermissions = new TextInputBuilder()
    .setCustomId("commandPermissions")
    .setLabel("Mod Permissions? (Yes or No)...")
    .setStyle(TextInputStyle.Short);
  const commandInputName = new TextInputBuilder()
    .setCustomId("commandInputName")
    .setLabel("Command input name ('null' for no input)...")
    .setStyle(TextInputStyle.Short);
  const commandInputDescription = new TextInputBuilder()
    .setCustomId("commandInputDescription")
    .setLabel("Input description ('null' for no input)...")
    .setStyle(TextInputStyle.Paragraph);
  const firstModalRow = new ActionRowBuilder().addComponents(commandNameInput);
  const secondModalRow = new ActionRowBuilder().addComponents(commandDescription);
  const thirdModalRow = new ActionRowBuilder().addComponents(commandPermissions);
  const fourthModalRow = new ActionRowBuilder().addComponents(commandInputName);
  const fifthModalRow = new ActionRowBuilder().addComponents(commandInputDescription);
  modal.addComponents(firstModalRow, secondModalRow, thirdModalRow, fourthModalRow, fifthModalRow);
  return modal;
}

function createNewCommand(commandName, commandDescription, commandPermissions, commandInputName, commandInputDescription) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((commands) => {

      // Recreate all commands that already exist.
      let newCommands = [];
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].options === undefined) {
          newCommands.push(new SlashCommandBuilder()
            .setName(commands[i].name)
            .setDescription(commands[i].description)
            .setDefaultMemberPermissions(commands[i].default_member_permissions))
        }
        else {
          newCommands.push(new SlashCommandBuilder()
          .setName(commands[i].name)
          .setDescription(commands[i].description)
          .setDefaultMemberPermissions(commands[i].default_member_permissions)
          .addStringOption(option => 
            option.setName(commands[i].options[0].name)
              .setDescription(commands[i].options[0].description))
          .require(true));
          }
      }

      // Create New Command
      if (commandInputName !== "null") {
        newCommands.push(new SlashCommandBuilder()
          .setName(commandName)
          .setDescription(commandDescription)
          .setDefaultMemberPermissions(commandPermissions)
          .addStringOption(option => 
            option.setName(commandInputName)
              .setDescription(commandInputDescription))
          .require(true));
      }
      else {
        newCommands.push(new SlashCommandBuilder()
          .setName(commandName)
          .setDescription(commandDescription)
          .setDefaultMemberPermissions(commandPermissions))
      }

      const JSONCommands = newCommands.map((command) => command.toJSON());
      const logMessage = "New commands created...";
      setCommandsViaRest(logMessage, {body: JSONCommands,})
      })
    .catch(console.error);
}

function deleteAllCommands() {
  const logMessage = "All commands deleted...";
  setCommandsViaRest(logMessage, { body: [],});
}

function listCommands(interaction) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((data) => { 
      let dataString = null;
      for (let i = 0; i < data.length; i++) {
        dataString = `${dataString} Name: ${data[i].name} ID: ${data[i].id} \n`
      }
      interaction.reply(dataString);
    })
    .catch(console.error);
}

function deleteCommandByID() {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest.delete(Routes.applicationGuildCommand(process.env.myClientID, process.env.myGuildID, interaction.options.getString('command')))
	  .then(() => console.log('Successfully deleted guild command...'))
	  .catch(console.error);
}

function resetSlashFunctions() {
  const commands = [
    new SlashCommandBuilder()
    .setName("createcommand")
    .setDescription("(MODS) Will create a public command with no functionality.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ].map((command) => command.toJSON());
  const logMessage = "Base command created, all other commands deleted..."
  setCommandsViaRest(logMessage, {body: commands,})
}

function returnCoinFlipResult() {
  return Math.random() >= 0.5 ? "Phwee!" : "Aethy!";
}

function setCommandsViaRest(logMessage, Commands){
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .put(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID), Commands)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}

module.exports = { createNewCommand, deleteAllCommands, deleteCommandByID, ReturnModal, resetSlashFunctions, returnCoinFlipResult, listCommands };