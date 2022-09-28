/*
  HEADER:
    1.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

const AWS = require(`aws-sdk`); // Needed for hidden variables using Heroku
const S3 = new AWS.S3({ MyToken: process.env.Token });
const { Client, GatewayIntentBits } = require(`discord.js`);
const {LarryWisdomLines} = require(`./LarryWisdom.js`);
const MyClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

console.log(`LarryBot Loaded...`);

// Event Listener - Needs to be changed to a slash function.
MyClient.on(`messageCreate`, async (message) => {
  let Reply = ``;
  if (message.content.toLowerCase().includes(`//larry`)) {
    Reply =
      LarryWisdomLines[Math.floor(Math.random() * LarryWisdomLines.length)];
  }
  else if (message.content.toLowerCase().includes(`//whoislarry`)) {
    Reply = `https://phwee-larry.carrd.co/`;
  }
  else return;
  console.log(`User ${message.author.username} has called for Larry`);
  await message.reply(`<:phweeLarry:1023966100226060339> ${Reply}`);
});

MyClient.login(S3.config.MyToken);
