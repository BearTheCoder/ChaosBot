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
  console.log(`All roles updated...`);
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
  updateUserRoles,
  updateAllRoles,
  sendErrorPM,
};
