/*
  HEADER:
    1.) Currently, we are checking each message for "//larry" which is inefficient.
        To optimize, we should create and ACTUAL "slash function" that will only fire when the "slash function" is called.
        Only issue, I have no clue how to create actual slash functions yet.
*/

// Access other scripts in directory
const LarryBot = require(`./LarryBot/LarryBot.js`);
const SB_Bot = require(`./SubscriberBot/SubscriberBot.js`);

//Global vars
const AWS = require(`aws-sdk`); // Needed for hidden variables using Heroku

const S3 = new AWS.S3({
    MyToken: process.env.Token,
    MyGuildID: process.env.GuildID,
    MyUserID: process.env.UserID,
});

const {
    Client,
    GatewayIntentBits,
} = require("discord.js");

const MyClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

console.log(`Main.js Loaded...`);

// Event Listener - Needs to be changed to a slash function.
MyClient.on(`messageCreate`, async (message) => {
    if (message.content.toLowerCase().includes("//roleupdate")) {
        SB_Bot.SendButton(message);
    }
    else if (message.content.toLowerCase().includes("//larry")) {
        LarryBot.LarryFunc(message);
    }
});

client.on("guildMemberUpdate", (newMember) => {
    try {
        SB_Bot.UpdateUserRoles(newMember);
    } catch (ErrorMsg) {
        SB_Bot.SendMessage(ErrorMsg);
    }
});

MyClient.on("interactionCreate", async (iAction) => {
    if (!iAction.customId === "roleupdate") return;
    //Put Action Here -------------------------------
    SB_Bot.UpdateAllRoles();
    await iAction.reply({
        content: "All roles are being updated... The orignal message has been deleted to prevent multiple tasks.",
        ephemeral: true, //This makes the message delete after a certain period of time
    });
    iAction.message.delete();
});

MyClient.login(S3.config.MyToken);