const { REST, SlashCommandBuilder, Routes, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
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
  const commandDescriptionInput = new TextInputBuilder()
    .setCustomId("commandDescriptionInput")
    .setLabel("Input your slash command description...")
    .setStyle(TextInputStyle.Paragraph);
  const firstModalRow = new ActionRowBuilder().addComponents(commandNameInput);
  const secondModalRow = new ActionRowBuilder().addComponents(commandDescriptionInput);
  modal.addComponents(firstModalRow, secondModalRow);
  return modal;
}

function createNewCommand(commandName, commandDescription) {
  // Uncomment lines below when you figure out modal.
  let commands = Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID);

  commands.push(
    new SlashCommandBuilder()
    .setName(commandName)
    .setDescription(commandDescription)
    );

  commands.map((command) => command.toJson());

  // const commands = [
  //   new SlashCommandBuilder()
  //   .setName(commandName)
  //   .setDescription(commandDescription),
  // ].map((command) => command.toJSON());

  // const rest = new REST({ version: "10" }).setToken(s3.config.myToken);
  // rest
  //   .put(Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID), { body: commands, })
  //   .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  //   .catch(console.error);
}

function deleteAllCommands() {
  const logMessage = "All commands deleted...";
  connectViaRest(logMessage, { body: []});
  // const rest = new REST({ version: "10" }).setToken(s3.config.myToken);
  // rest
  //   .put(Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID), { body: [], })
  //   .then(() => console.log("Successfully deleted all guild commands."))
  //   .catch(console.error);
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
  // rest
  //   .delete(Routes.applicationGuildCommand(s3.config.myClientID, s3.config.myGuildID, commandId))
  //   .then(() => console.log("Successfully deleted guild command"))
  //   .catch(console.error);
}

function createBaseCommand() {
  const commands = [
    new SlashCommandBuilder()
    .setName("CreateCommand")
    .setDescription("This command will delete all existing ChaosBot commands and init the creating modal command."),
  ].map((command) => command.toJSON());
  const logMessage = "Base command created, all other commands deleted..."
  connectViaRest(logMessage, {body: commands})
  // const rest = new REST({ version: "10" }).setToken(s3.config.myToken);
  // rest
  //   .put(Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID), { body: commands, })
  //   .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  //   .catch(console.error);
}

function connectViaRest(logMessage, TestVar){
  const rest = new REST({ version: "10" }).setToken(s3.config.myToken);
  rest
    .put(Routes.applicationGuildCommands(s3.config.myClientID, s3.config.myGuildID), TestVar)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}

module.exports = { createNewCommand, deleteAllCommands, deleteCommandByID, ReturnModal, createBaseCommand };