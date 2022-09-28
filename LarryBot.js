/*
  HEADER:
    1.) Is it possible to seperate "LarryWisdomLines" into a seperate file using JS?
        Using C# it would be a seperate class and accessible as a static or an object as long as it is in the same directory.
        But I am not sure how to do that with JS.
    2.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

const AWS = require("aws-sdk"); // Needed for hidden variables using Heroku
const S3 = new AWS.S3({ MyToken: process.env.Token });
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
  let Reply = "";
  if (message.content.toLowerCase().includes("//larry")) {
    Reply =
      LarryWisdomLines[Math.floor(Math.random() * LarryWisdomLines.length)];
  }
  else if (message.content.toLowerCase().includes("//whoislarry")) {
    Reply = "https://phwee-larry.carrd.co/";
  }
  else return;
  await message.reply(`<:phweeLarry:1023966100226060339> ${Reply}`);
});

MyClient.login(S3.config.MyToken);

const LarryWisdomLines = [
  "Flush the toilet after use, or Larry will eat your legs.",
  "One germ can multiply into more than 8 million germs in one day. But that means nothing to Larry for he is immune to all diseases.",
  "Remote controls contribute to the 90,000 annual deaths from infection acquired in hospitals. And Larry will be responsible for your's if you don't remain clean.",
  "You're 1000 times more likely to spread bacteria with damp hands. And damp hands are Larry's favorite.",
  "Wash your feet with soap and water in the shower daily. Dry well to prevent athlete's feet or Larry will sneak your feet cheese into your food.",
  "It takes 30 seconds to wash your hands well, but only 5 seconds for Larry to chomp em.",
  "Washing hands with soap and water can reduce death from diarrhea or Larry by up to 50%.",
  "Front to back, never back to front. You don't want to be behind Larry.",
  "Toothpaste is not supposed to taste like iron, brush lightly or Larry will brush them for you.",
  "Wash your body daily or Larry will join you in the shower and make sure that you do.",
  "Cover your nose and mouth with a tissue (or your sleeve) when sneezing or coughing, otherwise Larry will use you as a sleeve when he's sick.",
  "Do NOT try to scrape out earwax from your ear canals, or Larry will put it back in when you're sleeping.",
  "Use a plate. If you drop crumbs, Larry will follow you home.",
  "Know the breadcrumb trail? Leave one if you wanna see Larry up close.",
  "Larry likes to live in the cups you leave on your table.",
  "If Larry is god and Bear made god, does that make Bear god-god?",
  "If rubber ducks live in the bathtub does that make the rubber duck dungeon a bathroom? Don't pee on the floor, there's a toilet right next to Larry!",
  "La~ La~ La~ Larry! At your service!",
  "Sometimes I get sad because Aethy thinks I'm ugly, but then I remember that she likes hygiene and that makes me happy again!",
  "I heard that Aethy and Phwee BOTH don't clean their keyboard. Like ever. Master Niuraeix would be so disappointed :,(",
  "If I practise good hygiene everyday, do you think Aethy will let me intern at the Cardboard Clinic one day?",
  "Phwee likes her phweedom but she could definitely do with some phwee lessons on improving her personal hygiene.",
  "Aethy says she likes personal hygiene but Mia doesnt even take showers that often. I heard she even licks her butt sometimes. When will Aethy love me too?",
  "97, 98, 99, 100! Ready or not here Larry comes! Oh.. where did everyone go? Did you need to wash your hands before we play?",
  "I might be a toilet rug but I like snuggles too. Can I join you in the blankies? Pwease? I swear I'm clean, I like personal hygiene!",
  "Every dish you leave in your sink brings Larry another foot closer.",
  "If I had a dollar for every chip Phwee dropped...",
  "If you leave mice feeding at night, Larry will feed on you.",
  "Wait.. am I a furry?",
  "Just because I'm immortal, doesnt make me a god. I'm just a little fish with a big hygiene dream. But if having worshippers means I get free handsoap...",
  "LaREEEEEEEEEEEEEEEEEEEEEE",
  `..and then he said, "Yer a wizard, Larry" and I just ignored him and pretended I was a non-sentient toilet rug.`, // Back ticks are similar to quotations in JS
  "Wash your hands with soap and water, or don't; Larry likes the flavor",
];
