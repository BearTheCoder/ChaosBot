// *****     Package Imports     *****
require('dotenv').config; // Railway required package for environment variables
const { Client, GatewayIntentBits, } = require("discord.js");

// *****     Imports     *****
const SlashCommandsController = require(`./BotFunctions/SlashCommandsController.js`);
const DoubleSlashCommandsController = require(`./BotFunctions/DoubleSlashCommandsController.js`);
const createNewCommand_GC = require(`./BotFunctions/CommandController/CommandController.js`).createNewCommand;
const updateUserRoles_GC = require(`./BotFunctions/SubscriberBot/SubscriberBot.js`).updateUserRoles;

// *****     Main.JS     *****
const myClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
  ],
});

myClient.once('ready', () => { console.log('Main.js loaded...'); });

myClient.on(`messageCreate`, async (userMessage) => {
  if (userMessage.content.includes("//") && !userMessage.content.includes("http")) {
    for (let i = 0; i < DoubleSlashCommandsController.commands.length; i++) {
      let commandName = DoubleSlashCommandsController.commands[i].commandName;
      if (userMessage.content.toLowerCase().includes(commandName)) {
        DoubleSlashCommandsController.commands[i].commandFunction(userMessage);
        break;
      }
    }
  }
});

myClient.on("guildMemberUpdate", (oldMember, newMember) => { updateUserRoles_GC(newMember); });

myClient.on("interactionCreate", async (iAction) => {
  const iFields = iAction.fields;
  if (iAction.customId !== "createCommandModal") {
    for (let i = 0; i < SlashCommandsController.interactions.length; i++) {
      if (iAction.commandName === SlashCommandsController.interactions[i].commandName) {
        SlashCommandsController.interactions[i].commandFunction(iAction, myClient);
        break;
      }
    }
  }
  else {
    const modalObject = {
      commandPermissions: iFields.getTextInputValue('commandPermissions').toLowerCase().includes("yes") ? '4' : null,
      commandName: iFields.getTextInputValue('commandName').toLowerCase(),
      commandDescription: iFields.getTextInputValue('commandDescription'),
      commandInputRequired: iFields.getTextInputValue('commandInputRequired').toLowerCase().includes("yes") ? true : false,
      commandInputName: iFields.getTextInputValue('commandInputName').toLowerCase(),
    };
    createNewCommand_GC(modalObject);
    iAction.reply("New command created!");
  }
});

myClient.login(process.env.myToken);