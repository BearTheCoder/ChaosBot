/*
  HEADER:
    1.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

import { TestFunc } from `./LarryBot/TestLArry.js`;
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
    TestFunc(message);
});

MyClient.login(S3.config.MyToken);