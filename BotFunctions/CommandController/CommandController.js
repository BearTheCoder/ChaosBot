// *****     Package Imports     *****
require('dotenv').config; // Railway required package for environment variables
const {
  REST,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Routes,
  EmbedBuilder,
} = require("discord.js");

// *****    Exports     *****
module.exports.listCommands = () => {
  return new Promise((thenFunc, catchFunc) => {
    try {
      let embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Commands')
        .setDescription('List of all current slash commands and their IDs.')
        .setTimestamp();
      const rest = new REST({ version: "10" }).setToken(process.env.myToken);
      rest.get(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID))
        .then((data) => {
          let dataArray = [];
          for (let i = 0; i < data.length; i++) {
            dataArray.push({ name: data[i].name, id: data[i].id });
          }
          dataArray.forEach((element) => {
            embed.addFields({
              name: `${element.name} Type: ${element.type}`,
              value: `ID: ${element.id} \n ${element.description}`,
              inline: false
            });
          });
          return rest.get(Routes.applicationCommands(process.env.applicationID));
        })
        .then((data) => {
          let dataArray = [];
          for (let i = 0; i < data.length; i++) {
            dataArray.push({ name: data[i].name, id: data[i].id });
          }
          dataArray.forEach((element) => {
            embed.addFields({ name: element.name, value: element.id, inline: false });
          });
          thenFunc(embed);
        })
        .catch(console.error);
    }
    catch (ex) {
      catchFunc(`Error retrieving commands...`);
    }
  });
};

module.exports.deleteCommandByID = interaction => {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest.delete(Routes.applicationGuildCommand(process.env.applicationID, process.env.myGuildID, interaction.options.getString('commandid')))
    .then(() => console.log('Successfully deleted guild command...'))
    .catch(console.error);
};

module.exports.resetCommands = interaction => {
  return new Promise((thenFunc, catchFunc) => {
    if (interaction.options.getString('password') === process.env.pass) {
      const commands = [
        new SlashCommandBuilder()
          .setName("resetcommands")
          .setDescription("(MODS - PASSWORD) Removes all functions except 'createcommand' and 'resetfunctions'.")
          .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
          .addStringOption(option =>
            option.setName("password")
              .setDescription("password")
              .setRequired(true))
      ];
      rest.put(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID), { body: commands })
        .then(() => console.log("Base commands created, all other commands deleted..."))
        .catch(console.error);
      thenFunc(`All commands have been reset...`);
    }
    else {
      catchFunc(`Password is incorrect...`);
    }
  });
};;