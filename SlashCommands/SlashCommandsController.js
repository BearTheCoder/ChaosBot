const { REST, SlashCommandBuilder, Routes, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits  } = require("discord.js");
const aws = require(`aws-sdk`); // Needed for hidden variables using Heroku
const s3 = new aws.S3({
  myToken: process.env.Token,
  myGuildID: process.env.GuildID,
  myClientID: process.env.ClientID,
});


function ReturnModal(){
  const modal = new ModalBuilder()
    .setCustomId("createCommandModal")
    .setTitle("Create Command");
  const commandNameInput = new TextInputBuilder()
    .setCustomId("commandName")
    .setLabel("This is a test modal...")
    .setStyle(TextInputStyle.Short);
  const commandDescription = new TextInputBuilder()
    .setCustomId("commandDescription")
    .setLabel("Input your slash command description...")
    .setStyle(TextInputStyle.Paragraph);
  const firstModalRow = new ActionRowBuilder().addComponents(commandNameInput);
  const secondModalRow = new ActionRowBuilder().addComponents(commandDescription);
  modal.addComponents(firstModalRow, secondModalRow);
  return modal;
}

function createNewCommand(commandName, commandDescription) {
  const rest = new REST({ version: "10" }).setToken(s3.config.myToken);
  rest
    .get(Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID))
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
        .setDescription(commandDescription));
      const JSONCommands = newCommands.map((command) => command.toJSON());
      console.log(newCommands);
      const logMessage = "New commands created...";
      connectViaRest(logMessage, {body: JSONCommands,})
      })
    .catch(console.error);
}

function deleteAllCommands() {
  const logMessage = "All commands deleted...";
  connectViaRest(logMessage, { body: [],});
}

function deleteCommandByID(userMessage) {
  try{
  const splitMessage = userMessage.trim().split(/\s+/)
  const logMessage = "All commands deleted...";
  connectViaRest(logMessage, splitMessage[1]);
  } catch (error) {
    console.log('Error deleting command by id...');
    console.log(error);
  }
}

function createBaseCommand() {
  const commands = [
    new SlashCommandBuilder()
    .setName("createcommand")
    .setDescription("Will create a public command with no functionality.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ].map((command) => command.toJSON());
  const logMessage = "Base command created, all other commands deleted..."
  connectViaRest(logMessage, {body: commands,})
}

function connectViaRest(logMessage, TestVar){
  const rest = new REST({ version: "10" }).setToken(s3.config.myToken);
  rest
    .put(Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID), TestVar)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}

module.exports = { createNewCommand, deleteAllCommands, deleteCommandByID, ReturnModal, createBaseCommand };