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
    .setLabel("Input permissions...")
    .setStyle(TextInputStyle.Short);
  const firstModalRow = new ActionRowBuilder().addComponents(commandNameInput);
  const secondModalRow = new ActionRowBuilder().addComponents(commandDescription);
  const thirdModalRow = new ActionRowBuilder().addComponents(commandPermissions);
  modal.addComponents(firstModalRow, secondModalRow, thirdModalRow);
  return modal;
}

function createNewCommand(commandName, commandDescription, commandPermissions) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((commands) => {
      let newCommands = [];
      for (let i = 0; i < commands.length; i++) {
        newCommands.push(new SlashCommandBuilder()
          .setName(commands[i].name)
          .setDescription(commands[i].description)
          .setDefaultMemberPermissions(commands[i].default_member_permissions))
      }
      newCommands.push(new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDescription)
        .setDefaultMemberPermissions(commandPermissions));
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

function deleteCommandByID(interaction, myClient) {
  //console.log(interaction);
  getCommandsViaRest();
  // try{
  //   const logMessage = ``;
  //   connectViaRest(logMessage, splitMessage[1]);
  // } 
  // catch (error) {
  //   console.log('Error deleting command by id...');
  //   console.log(error);
  // }
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

function setCommandsViaRest(logMessage, Commands){
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .put(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID), Commands)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}

function getCommandsViaRest(logMessage) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((data) => console.log(data))
    .catch(console.error);
}

function returnCoinFlipResult(interaction){
  let coinFlipResult = Math.random() >= 0.5 ? "Phwee!" : "Aethy!";
  interaction.reply(coinFlipResult);
}

module.exports = { createNewCommand, deleteAllCommands, deleteCommandByID, ReturnModal, resetSlashFunctions, returnCoinFlipResult };