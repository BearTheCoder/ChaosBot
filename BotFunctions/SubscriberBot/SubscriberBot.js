// *****     Exports     *****
function updateUserRoles (currentMember, myPersonalID) {
  const kittenRole = currentMember.roles.cache.find((role) => role.id === '917969234334744636'); //Kittens
  const phweeRole = currentMember.roles.cache.find((role) => role.id === '920174030458351646'); //Phweebs
  const combinedRole = currentMember.roles.cache.find((role) => role.id === '1020691003084128286'); //Phweettens
  if (kittenRole !== undefined && phweeRole !== undefined && combinedRole === undefined) {
    currentMember.roles.add(combinedRole);
    console.log(`Added role to ${currentMember.displayName}`);
  }
  else if ((kittenRole === undefined || phweeRole === undefined) && combinedRole !== undefined) {
    currentMember.roles.remove(combinedRole);
    console.log(`Removed role from ${currentMember.displayName}`);
  }
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