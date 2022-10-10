/*
  HEADER:
    1.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

// Access other scripts in directory
const subscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const doubleSlashCommands = require(`./DoubleSlashCommands/DoubleSlashCommands.js`);
const slashCommands = require(`../SlashCommands/SlashCommands.js`);

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

console.log(`Main.js Loaded...`);

myClient.on(`messageCreate`, async (userMessage) => {
  if (userMessage.content.includes("//")) {
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
    subscriberBot.sendErrorPM(errorMsg, s3.config.myUserID);
  }
});

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
  if (iAction.commandName === "createcommand"){
    const modal = slashCommands.ReturnModal();
    await iAction.showModal(modal);
  }
});

myClient.login(s3.config.myToken);
