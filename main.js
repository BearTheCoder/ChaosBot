// Access other scripts in directory
const subscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const doubleSlashCommands = require(`./DoubleSlashCommands/DoubleSlashCommands.js`);
const interactions = require('./SlashCommands/Interactions.js');
const slashCommandsController = require(`./SlashCommands/SlashCommandsController.js`);

//Global vars
const aws = require(`aws-sdk`); // Needed for hidden variables using Heroku
const s3 = new aws.S3({
  myToken: process.env.Token,
  myGuildID: process.env.GuildID,
  myUserID: process.env.BearID,
});
const { Client, GatewayIntentBits } = require("discord.js");
const myClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

//Called once application connects to discord.
myClient.once('ready', () => {
  console.log('Main.js Loaded...')
});

//Called everytime a user types a message in any channel.
myClient.on(`messageCreate`, async (userMessage) => {
  if (userMessage.content.includes("//") && !userMessage.content.includes("http")) {
    for (let i = 0; i < doubleSlashCommands.commands.length; i++) {
      let commandName = doubleSlashCommands.commands[i].commandName;
      if (userMessage.content.toLowerCase().includes(commandName)) {
        doubleSlashCommands.commands[i].commandFunction(userMessage);
        break;
      }
    }
  }
});

//Called everytime a guild member changes in any way.
myClient.on("guildMemberUpdate", (newMember) => {
  try {
    subscriberBot.updateUserRoles(newMember);
  } catch (errorMsg) {
    subscriberBot.sendErrorPM(errorMsg, s3.config.myUserID);
  }
});

//Called when... idk yet.
myClient.on("interactionCreate", async (iAction) => {
  if (iAction.customId === "roleupdate") {
    subscriberBot.updateAllRoles(myClient, s3.config.myGuildID);
    await iAction.reply({
      content:
        "All roles are being updated... The orignal message has been deleted to prevent multiple tasks.",
      ephemeral: true, //This makes the message delete after a certain period of time
    });
    iAction.message.delete();
  }
  else if (iAction.customId === "createCommandModal"){
    const commandName = iAction.fields.getTextInputValue('commandName').toLowerCase();
    const commandDescription = iAction.fields.getTextInputValue('commandDescription');
    let commandPermissions = iAction.fields.getTextInputValue('commandPermissions');
    if (commandPermissions === '*') commandPermissions = null;
    slashCommandsController.createNewCommand(commandName, commandDescription, commandPermissions);
    iAction.reply("New command created!")
  }
  else{
    for (let i = 0; i < interactions.interactions.length; i++) {
      let commandName = interactions.interactions[i].commandName;
      if (iAction.commandName === commandName) {
        interactions.interactions[i].commandFunction(iAction);
        break;
      }
    }
  }
});

myClient.login(s3.config.myToken);