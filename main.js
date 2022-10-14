const subscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const doubleSlashCommands = require(`./DoubleSlashCommands/DoubleSlashCommands.js`);
const interactions = require('./SlashCommands/Interactions.js');
const slashCommandsController = require(`./SlashCommands/SlashCommandsController.js`);
require('dotenv').config;

const { Client, GatewayIntentBits } = require("discord.js");
const myClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

myClient.once('ready', () => {
  console.log('Main.js Loaded...')
});

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

myClient.on("guildMemberUpdate", (newMember) => {
  try {
    subscriberBot.updateUserRoles(newMember);
  } catch (errorMsg) {
    subscriberBot.sendErrorPM(errorMsg, process.env.myPersonalID);
  }
});

myClient.on("interactionCreate", async (iAction) => {
  if (iAction.customId === "createCommandModal"){
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
        interactions.interactions[i].commandFunction(iAction, myClient);
        break;
      }
    }
  }
});

myClient.login(process.env.myToken);