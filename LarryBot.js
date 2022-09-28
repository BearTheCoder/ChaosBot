const AWS = require("aws-sdk"); // Needed for hidden variables using Heroku
const S3 = new AWS.S3({
  MyToken: process.env.Token,
});
const { Client, GatewayIntentBits } = require("discord.js");
const MyClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

console.log("Bot Loaded...");
// Event Listener
MyClient.on("messageCreate", async (message) => {
  if (!message.content.toLowerCase().includes("//larrybot")) return;
  let Reply =
    LarryWisdomLines[Math.floor(Math.random() * LarryWisdomLines.length)];
  await message.reply(`<:phweeLarry:1023966100226060339> ${Reply}`);
});

MyClient.login(S3.config.MyToken);

const LarryWisdomLines = [
  "One germ can multiply into more than 8 million germs in one day. But that means nothing to Larry for he is immune to all diseases.",
  "Remote controls contribute to the 90,000 annual deaths from infection acquired in hospitals. And Larry will be responsible for your's if you don't remain clean.",
  "You're 1000 times more likely to spread bacteria with damp hands. And damp hands are Larry's favorite.",
];
