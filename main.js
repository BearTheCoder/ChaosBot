/*
  HEADER:
    1.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

// Access other scripts in directory
const larryBot = require(`./LarryBot/LarryBot.js`);
const subscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const magic8Ball = require(`./Magic8Ball/Magic8Ball.js`);
const doubleSlashCommands = require(`./DoubleSlashCommands/DoubleSlashCommands.js`);

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
    console.log(doubleSlashCommands.commands);
    for (let i = 0; i < doubleSlashCommands.commands; i++) {
      let commandName = doubleSlashCommands.commands[i].commandName;
      console.log(commandName);
      if (userMessage.content.toLowerCase().includes(commandName)) {
        console.log("Included...");
        doubleSlashCommands.commands[i].commandFunction(userMessage);
      }
    }
  }

  // if (userMessage.content.toLowerCase().includes("//roleupdate")) {
  //   subscriberBot.sendButtonInPM(userMessage);
  // } else if (userMessage.content.toLowerCase().includes("//larry")) {
  //   larryBot.sendLarryWisdom(userMessage);
  // } else if (userMessage.content.toLowerCase().includes("//whoislarry")) {
  //   larryBot.sendLarryInfo(userMessage);
  // } else if (userMessage.content.toLowerCase().includes("//8ball")) {
  //   magic8Ball.send8BallMessage(userMessage);
  // }
});

myClient.on("guildMemberUpdate", (newMember) => {
  try {
    subscriberBot.updateUserRoles(newMember);
  } catch (errorMsg) {
    subscriberBot.sendErrorPM(errorMsg, s3.config.myUserID);
  }
});

myClient.on("interactionCreate", async (iAction) => {
  if (!iAction.customId === "roleupdate") return;
  subscriberBot.updateAllRoles(myClient, s3.config.myGuildID);
  await iAction.reply({
    content:
      "All roles are being updated... The orignal message has been deleted to prevent multiple tasks.",
    ephemeral: true, //This makes the message delete after a certain period of time
  });
  iAction.message.delete();
});

myClient.login(s3.config.myToken);
