/*
  HEADER:
    1.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

const LarryBot = require(`./LarryBot/LarryBot.js`);
const SB_Bot = require(`./SubscriberBot/SubscriberBot.js`);
const AWS = require(`aws-sdk`); // Needed for hidden variables using Heroku
const S3 = new AWS.S3({ MyToken: process.env.Token });
const { Client, GatewayIntentBits } = require(`discord.js`);
const MyClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

console.log(`Main.js Loaded...`);

// Event Listener - Needs to be changed to a slash function.
MyClient.on(`messageCreate`, async (message) => {
    LarryBot.LarryFunc(message);
    SB_Bot.TestFunc();
});

MyClient.login(S3.config.MyToken);