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

  //Ignore Links
  if (!userMessage.content.includes("//") && userMessage.content.includes("http")) return;

  //This is a reply to Larry (OpenAi edit)
  if (userMessage.mentions.repliedUser !== null && userMessage.mentions.repliedUser.username == "ChaosBot") {
    const msgID = userMessage.reference.messageId;
    userMessage.channel.messages.fetch(msgID)
      .then(msg => {
        if (msg.content.includes("Larry says:")) {
          //extract original message and send to openAI edit endpoint
          let editInput = msg.content.replace("<:phweeLarry:1023966100226060339> **Larry says:**", "");
          editInput = editInput.replace(/^\s+|\s+$/g, '');
          DoubleSlashCommandsController.commands.filter(obj => {
            if (obj.commandName === "editHeyLarry") {
              obj.commandFunction(editInput, userMessage);
            }
          });
        }
      });
  }

  // Search for command and fire.
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
    SlashCommandsController.interactions[i].commandFunction(iAction);
    break;
  }
});

myClient.login(process.env.myToken);