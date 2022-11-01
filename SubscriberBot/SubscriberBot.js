function updateUserRoles (currentMember) {
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
  let combinedRole = currentMember.guild.roles.cache.find((findCombinedRoleAsync) =>
    findCombinedRoleAsync.name.toLowerCase().includes("phweettens")
  );
  if (hasKittenRole && hasPhweakRole && !hasPhweettenRole) {
    currentMember.roles.add(combinedRole);
    console.log(`Added role to ${ currentMember.displayName }`);
  } else if ((!hasKittenRole || !hasPhweakRole) && hasPhweettenRole) {
    currentMember.roles.remove(combinedRole);
    console.log(`Removed role from ${ currentMember.displayName }`);
  }
}

function updateAllRoles (myClient, myGuildID) {
  const myGuild = myClient.guilds.cache.get(myGuildID);
  myGuild.members.fetch().then((listOfMembers) => {
    listOfMembers.forEach((currentMember) => {
      updateUserRoles(currentMember);
    });
  });
}

async function sendErrorPM (localError, myUserID) {
  const myUserInfo = await client.users.fetch(myUserID);
  myUserInfo.send(`The bot has experienced and error: ${ localError } \n 
    Please go to https://raliway.app to check error logs.
  `);
}

module.exports = {
  updateUserRoles,
  updateAllRoles,
  sendErrorPM,
};
