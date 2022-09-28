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
  "Wash your hands with soap and water for at least 30 seconds. Or let Larry eat them and you won't have to wash your hands again. Ever. ",
  "Wash your feet with soap and water in the shower daily. Dry well to prevent athlete's feet. Larry likes fit feet.",
  "It takes 30 seconds to wash your hands well, but 5 seconds for Larry to chomp em. ",
  "Washing hands with soap and water can reduce death from diarrhoea by up to 50%! ",
  "Front to back, never back to front. You don't want to be behind Larry. ",
  "Toothpaste is not supposed to taste like iron, brush lightly. Sharks are Larry's cousin. ",
  "Wash your body daily. If you stink, Larry can smell you. Larry likes scents.",
  "Cover your nose and mouth with a tissue (or your sleeve) when sneezing or coughing. Or Larry will use you as a neti pot. ",
  "Do NOT try to scrape out earwax from your ear canals, or Larry will come and lick your ear. ",
  "Make sure you flush the toilet after use, or Larry will get hungry and eat your legs. ",
  "Use a plate. If you drop crumbs, Larry can find you. ",
  "Know the breadcrumb trail? Leave one if you wanna see Larry up close",
  "Larry likes to live in the cups you leave on your table",
];
