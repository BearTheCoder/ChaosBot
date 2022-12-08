// *****     Exports     *****
function updateUserRoles (currentMember) {
  const kittenRole = currentMember.roles.cache.find((role) => role.id === '917969234334744636'); //Kittens 917969234334744636
  const phweeRole = currentMember.roles.cache.find((role) => role.id === '920174030458351646'); //Phweebs 920174030458351646
  const combinedRole = currentMember.roles.cache.find((role) => role.id === '1020691003084128286'); //Phweettens 1020691003084128286
  const guildCombinedRole = currentMember.guild.roles.cache.find((role) => role.id === '1020691003084128286'); //Phweettens 1020691003084128286
  if (kittenRole !== undefined && phweeRole !== undefined && combinedRole === undefined) {
    currentMember.roles.add(guildCombinedRole).then(() => {
      console.log(`Added role to ${currentMember.displayName}`);
    });
  }
  else if ((kittenRole === undefined || phweeRole === undefined) && combinedRole !== undefined) {
    currentMember.roles.remove(guildCombinedRole).then(() => {
      console.log(`Removed role from ${currentMember.displayName}`);
    });
  };
}

module.exports.updateAllRoles = (myClient, myGuildID) => {
  const myGuild = myClient.guilds.cache.get(myGuildID);
  myGuild.members.fetch()
    .then((listOfMembers) => {
      listOfMembers.forEach((currentMember) => { updateUserRoles(currentMember); });
    });
};

module.exports.updateUserRoles = updateUserRoles;