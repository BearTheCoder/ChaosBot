/*
  Current issues:
    1.) If a role is changed in Discord (A role not controlled by the bot), the event "guildMemberUpdate"
    fires as designed. If the bot THEN makes a change, the event fires a second time needlessly.
    This should be controlled for optimization.
    2.) The bot currently does not have the access to send messages in chat (I think).
    I need to test whether or not I need to change access levels in order to send messages into channels.
    If I need to update permissions, do I need to remove the current bot and add a new bot in?
*/

// Variable Init -------------------------------------------------------------------------------------

const AWS = require("aws-sdk"); // Needed for hidden variables using Heroku

const S3 = new AWS.S3({
    MyGuildID: process.env.GuildID,
    BearUserID: process.env.BearID,
});

const {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");

const BTN = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId("roleupdate")
        .setLabel("Reload user roles?")
        .setStyle(ButtonStyle.Primary)
);

async function SendButton(message) {
    await message.author.send({
        content: `If you believe there to be an issue with ChaosBot please contact BearTheCoder#6820 for debugging purposes.
            The button below will iterate through all users in the server and update the roles accordingly. Please be advised, if there are a
            large number of members this may take a while...`,
        components: [ BTN ],
    });
}

function UpdateUserRoles(CurrentMember) {
    console.log(`Updating roles for user ${CurrentMember.displayName}...`);
    let hasKittenRole = false;
    let hasPhweakRole = false;
    let hasPhweettenRole = false;
    CurrentMember.roles.cache.forEach((UserRole) => {
        if (UserRole.name.toLowerCase().includes("kittens")) {
            hasKittenRole = true;
        } else if (UserRole.name.toLowerCase().includes("phweaks")) {
            hasPhweakRole = true;
        } else if (UserRole.name.toLowerCase().includes("phweettens")) {
            hasPhweettenRole = true;
        }
    });
    //The following lines run ASYNC and takes a while for the results to show on DISCORD...
    let CombinedRole = CurrentMember.roles.cache.find((FindCombinedRole) =>
        FindCombinedRole.name.toLowerCase().includes("phweettens")
    );
    if (hasKittenRole && hasPhweakRole && !hasPhweettenRole) {
        CurrentMember.roles.add(CombinedRole);
    } else if ((!hasKittenRole || !hasPhweakRole) && hasPhweettenRole) {
        CurrentMember.roles.remove(CombinedRole);
    }
}

function UpdateAllRoles(client) {
    console.log(`Roles updated...`);
    const Guild = client.guilds.cache.get(S3.config.MyGuildID);
    Guild.members.fetch().then((ListOfMembers) => {
        ListOfMembers.forEach((CurrentMember) => {
            UpdateUserRoles(CurrentMember);
        });
    });
}

async function SendMessage(LocalError) {
    const BTC = await client.users.fetch(S3.config.BearUserID);
    BTC.send(`The bot has experienced and error: ${LocalError} \n 
    Please go to https://www.heroku.com to check error logs.
  `);
}

module.exports = { SendButton, UpdateUserRoles, UpdateAllRoles, SendMessage };