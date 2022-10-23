const subscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const doubleSlashCommands = require(`./DoubleSlashCommands/DoubleSlashCommands.js`);
const slashCommandInteractions = require('./SlashCommands/Interactions.js');
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
    const commandName = iAction.fields.getTextInputValue('commandName').toLowerCase(); // Will throw error if not lower case
    const commandDescription = iAction.fields.getTextInputValue('commandDescription');
    const commandInputName = iAction.fields.getTextInputValue('commandInputName').toLowerCase(); // Will throw typeerror if not lower case
    const commandInputDescription = iAction.fields.getTextInputValue('commandInputDescription')
    

    let commandPermissions = iAction.fields.getTextInputValue('commandPermissions');
    commandPermissions = commandPermissions.toLowerCase().includes("yes") ? '4' : null;

    let commandInputRequired = iAction.fields.getTextInputValue('commandInputRequired').toLowerCase();
    commandInputRequired = commandInputRequired.includes("yes") ? true : false;

    slashCommandsController.createNewCommand(commandName, commandDescription, commandPermissions, commandInputName, commandInputDescription, commandInputRequired)
    iAction.reply("New command created!")
  }
  else{
    for (let i = 0; i < slashCommandInteractions.interactions.length; i++) {
      let commandName = slashCommandInteractions.interactions[i].commandName;
      if (iAction.commandName === commandName) {
        slashCommandInteractions.interactions[i].commandFunction(iAction, myClient);
        break;
      }
    }
  }
});

myClient.login(process.env.myToken);