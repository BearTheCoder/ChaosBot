const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const updateRoleButton = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("roleupdate")
    .setLabel("Reload user roles?")
    .setStyle(ButtonStyle.Primary)
);

async function sendButtonInPM(message) {
  await message.author.send({
    content: `If you believe there to be an issue with ChaosBot please contact BearTheCoder#6820 for debugging purposes. The button below will iterate through all users in the server and update the roles accordingly. Please be advised, if there are a large number of members this may take a while...`,
    components: [updateRoleButton],
  });
}

function updateUserRoles(currentMember) {
  let hasKittenRole = false;
  let hasPhweakRole = false;
  let hasPhweettenRole = false;
  currentMember.roles.cache.forEach((userRole) => {
    if (userRole.name.toLowerCase().includes("kittens")) {
      hasKittenRole = true;
    } else if (userRole.name.toLowerCase().includes("phweaks")) {
      hasPhweakRole = true;
    } else if (userRole.name.toLowerCase().includes("phweettens")) {
      hasPhweettenRole = true;
    }
  });
  //The following lines run ASYNC and takes a while for the results to show on DISCORD...
  let combinedRole = currentMember.roles.cache.find((findCombinedRole) =>
    findCombinedRole.name.toLowerCase().includes("phweettens")
  );
  if (hasKittenRole && hasPhweakRole && !hasPhweettenRole) {
    currentMember.roles.add(combinedRole);
    console.log(`Added role to ${currentMember}`);
  } else if ((!hasKittenRole || !hasPhweakRole) && hasPhweettenRole) {
    currentMember.roles.remove(combinedRole);
    console.log(`Removed role from ${currentMember}`);
  }
}

function updateAllRoles(myClient, myGuildID) {
  console.log(`Roles updated...`);
  const myGuild = myClient.guilds.cache.get(myGuildID);
  myGuild.members.fetch().then((listOfMembers) => {
    listOfMembers.forEach((currentMember) => {
      updateUserRoles(currentMember);
    });
  });
}

async function sendErrorPM(localError, myUserID) {
  const myUserInfo = await client.users.fetch(myUserID);
  myUserInfo.send(`The bot has experienced and error: ${localError} \n 
    Please go to https://www.heroku.com to check error logs.
  `);
}

module.exports = {
  sendButtonInPM,
  updateUserRoles,
  updateAllRoles,
  sendErrorPM,
};
