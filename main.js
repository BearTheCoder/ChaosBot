// *****     Package Imports     *****
require('dotenv').config(); // Railway required package for environment variables
const { Client, GatewayIntentBits, } = require("discord.js");

// *****     Imports     *****
const SlashCommandsController = require(`./BotFunctions/Commands.js`);
const DoubleSlashCommandsController = require(`./BotFunctions/DoubleSlashCommands.js`);
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

myClient.once('ready', () => {
  console.log('Main.js loaded...');
});

myClient.on(`messageCreate`, async (userMessage) => {
  console.log(userMessage.reference.messageId);
  if (!userMessage.content.includes("//") && userMessage.content.includes("http")) return;
  for (let i = 0; i < DoubleSlashCommandsController.commands.length; i++) {
    let commandName = DoubleSlashCommandsController.commands[i].commandName;
    if (!userMessage.content.toLowerCase().includes(commandName)) continue;
    DoubleSlashCommandsController.commands[i].commandFunction(userMessage);
    break;
  }
});

myClient.on("guildMemberUpdate", (oldMember, newMember) => { updateUserRoles_GC(newMember); });

myClient.on("interactionCreate", async (iAction) => {
  for (let i = 0; i < SlashCommandsController.interactions.length; i++) {
    if (iAction.commandName !== SlashCommandsController.interactions[i].commandName) continue;
    SlashCommandsController.interactions[i].commandFunction(iAction, myClient);
    break;
  }
});

myClient.login(process.env.myToken);