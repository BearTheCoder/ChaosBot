// *****     Package Imports     *****
require('dotenv').config; // Railway required package for environment variables
const {
  REST,
  Routes,
  EmbedBuilder,
} = require("discord.js");

// *****    Exports     *****
module.exports.listCommands = () => {
  return new Promise((thenFunc, catchFunc) => {
    let embed = createEmbed();
    const rest = new REST({ version: "10" }).setToken(process.env.myToken);
    rest
      .get(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID))
      .then((data) => {
        embed = compileEmbed(data, embed);
        return rest.get(Routes.applicationCommands(process.env.applicationID));
      })
      .then((data) => {
        embed = compileEmbed(data, embed);
        thenFunc(embed);
      })
      .catch(() => catchFunc("Error retrieving commands..."));
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
    if (!interaction.options.getString('password') === process.env.pass) catchFunc("Bad password");
    const commands = [];
    new REST({ version: "10" }).setToken(process.env.myToken)
      .put(Routes.applicationGuildCommands(process.env.applicationID, process.env.myGuildID), { body: commands })
      .then(() => console.log("Base commands created, all other commands deleted..."))
      .catch(console.error);
    thenFunc(`All commands have been deleted...`);
  });
};

// *****     Internal Functions     *****
function createEmbed () {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Commands')
    .setDescription('List of all current slash commands and their IDs.')
    .setTimestamp();
}

function compileEmbed (data, embed) {
  const dataArray = Array.from(data);
  dataArray.forEach((element) => {
    embed.addFields({
      name: `${element.name}`,
      value: `ID: ${element.id} \n Type: ${element.type} | ${element.description}`,
      inline: false
    });
  });
  return embed;
}