let testing = false;

// *****     Exports     *****
function updateUserRoles (currentMember, myPersonalID) {

  if (testing) return;
  console.log(currentMember);
  console.log("\n");
  console.log(currentMember.roles);
  console.log("\n");
  console.log(currentMember.roles.cache);
  testing = true;
  // try {
  //   let hasKittenRole = false;
  //   let hasPhweakRole = false;
  //   let hasPhweettenRole = false;
  //   currentMember.roles.cache.forEach((userRole) => {
  //     if (userRole.name.toLowerCase().includes("kittens")) {
  //       hasKittenRole = true;
  //     } else if (userRole.name.toLowerCase().includes("phweebs")) {
  //       hasPhweakRole = true;
  //     } else if (userRole.name.toLowerCase().includes("phweettens")) {
  //       hasPhweettenRole = true;
  //     }
  //   });
  //   let combinedRole = currentMember.guild.roles.cache.find((findCombinedRoleAsync) =>
  //     findCombinedRoleAsync.name.toLowerCase().includes("phweettens")
  //   );
  //   if (hasKittenRole && hasPhweakRole && !hasPhweettenRole) {
  //     currentMember.roles.add(combinedRole);
  //     console.log(`Added role to ${currentMember.displayName}`);
  //   } else if ((!hasKittenRole || !hasPhweakRole) && hasPhweettenRole) {
  //     currentMember.roles.remove(combinedRole);
  //     console.log(`Removed role from ${currentMember.displayName}`);
  //   }
  // }
  // catch (localError) {
  //   sendErrorPM(localError, myPersonalID);
  // }
};

module.exports.updateAllRoles = (myClient, myGuildID) => {
  const myGuild = myClient.guilds.cache.get(myGuildID);
  myGuild.members.fetch()
    .then((listOfMembers) => {
      listOfMembers.forEach((currentMember) => {
        updateUserRoles(currentMember);
      });
    });
};

module.exports.updateUserRoles = updateUserRoles;

// *****     Internal Functions     *****
async function sendErrorPM (localError, myUserID) {
  const myUserInfo = await client.users.fetch(myUserID);
  myUserInfo.send(`The bot has experienced and error: ${localError} \n 
    Please go to https://raliway.app to check error logs.
  `);
};
