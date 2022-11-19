const {
  ActionRowBuilder,
  ModalBuilder,
  REST,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionFlagsBits,
  Routes,
  Events,
} = require("discord.js");
require("dotenv").config();
const { magicLines } = require(`../Magic8Ball/Magic8Ball_Lines.js`);
let canReply = false;

function returnCreateCommandModal () {
  const modal = new ModalBuilder()
    .setCustomId("createCommandModal")
    .setTitle("Create Command!");
  const commandNameInput = new TextInputBuilder()
    .setCustomId("commandName")
    .setLabel("Input Name")
    .setStyle(TextInputStyle.Short);
  const commandDescription = new TextInputBuilder()
    .setCustomId("commandDescription")
    .setLabel("Input Description")
    .setStyle(TextInputStyle.Paragraph);
  const commandPermissions = new TextInputBuilder()
    .setCustomId("commandPermissions")
    .setLabel("Mod Permissions? (Yes or No)")
    .setStyle(TextInputStyle.Short);
  const commandInputName = new TextInputBuilder()
    .setCustomId("commandInputName")
    .setLabel("Command Input Name ('null' for no input)")
    .setStyle(TextInputStyle.Short);
  const commandInputRequired = new TextInputBuilder()
    .setCustomId("commandInputRequired")
    .setLabel("Input Required? (Yes or No)")
    .setStyle(TextInputStyle.Short);
  const firstModalRow = new ActionRowBuilder().addComponents(commandNameInput);
  const secondModalRow = new ActionRowBuilder().addComponents(commandDescription);
  const thirdModalRow = new ActionRowBuilder().addComponents(commandPermissions);
  const fourthModalRow = new ActionRowBuilder().addComponents(commandInputName);
  const fifthModalRow = new ActionRowBuilder().addComponents(commandInputRequired);
  modal.addComponents(firstModalRow, secondModalRow, thirdModalRow, fourthModalRow, fifthModalRow);
  return modal;
}

function createNewCommand (commandName, commandDescription, commandPermissions, commandInputName, commandInputRequired) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((commands) => {

      // Recreate all commands that already exist.
      let newCommands = [];
      for (let i = 0; i < commands.length; i++) {
        if (commands[ i ].options === undefined) {
          newCommands.push(new SlashCommandBuilder()
            .setName(commands[ i ].name)
            .setDescription(commands[ i ].description)
            .setDefaultMemberPermissions(commands[ i ].default_member_permissions));
        }
        else {
          try {
            const isRequired = commands[ i ].options[ 0 ].required === undefined ? false : true;
            newCommands.push(new SlashCommandBuilder()
              .setName(commands[ i ].name)
              .setDescription(commands[ i ].description)
              .setDefaultMemberPermissions(commands[ i ].default_member_permissions)
              .addStringOption(option =>
                option.setName(commands[ i ].options[ 0 ].name)
                  .setDescription(commands[ i ].options[ 0 ].description)
                  .setRequired(isRequired)));
          }
          catch (err) {
            console.log(commands[ i ].name);
            console.log(err);
          }
        }
      }

      // Create New Command
      if (commandInputName !== "null") {
        newCommands.push(new SlashCommandBuilder()
          .setName(commandName)
          .setDescription(commandDescription)
          .setDefaultMemberPermissions(commandPermissions)
          .addStringOption(option =>
            option.setName(commandInputName)
              .setDescription(commandInputName)
              .setRequired(commandInputRequired)));
      }
      else {
        newCommands.push(new SlashCommandBuilder()
          .setName(commandName)
          .setDescription(commandDescription)
          .setDefaultMemberPermissions(commandPermissions));
      }

      const JSONCommands = newCommands.map((command) => command.toJSON());
      const logMessage = "New commands created...";
      setCommandsViaRest(logMessage, { body: JSONCommands, });
    })
    .catch(console.error);
}

function deleteAllCommands () {
  const logMessage = "All commands deleted...";
  setCommandsViaRest(logMessage, { body: [], });
}

function listCommands (interaction) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .get(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID))
    .then((data) => {
      console.log(data);
      let dataString = null;
      for (let i = 0; i < data.length; i++) {
        dataString = dataString === null ?
          `Name: ${ data[ i ].name } ID: ${ data[ i ].id } \n` :
          `${ dataString }Name: ${ data[ i ].name } ID: ${ data[ i ].id } \n`;
      }
      interaction.reply(dataString);
    })
    .catch(console.error);
}

function deleteCommandByID (interaction) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest.delete(Routes.applicationGuildCommand(process.env.myClientID, process.env.myGuildID, interaction.options.getString('command')))
    .then(() => console.log('Successfully deleted guild command...'))
    .catch(console.error);
}

function resetCommands (interaction) {
  if (interaction.options.getString('password') === 'allow chaos') {
    const commands = [
      new SlashCommandBuilder()
        .setName("createcommand")
        .setDescription("(MODS) Will create a public command with no functionality.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
      new SlashCommandBuilder()
        .setName("resetcommands")
        .setDescription("(MODS - PASSWORD) Removes all functions except 'createcommand' and 'resetfunctions'.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
          option.setName("password")
            .setDescription("password")
            .setRequired(true))
    ].map((command) => command.toJSON());
    const logMessage = "Base command created, all other commands deleted...";
    setCommandsViaRest(logMessage, { body: commands, });
    interaction.reply(`All commands have been reset...`);
  }
  else {
    interaction.reply(`Password is incorrect...`);
  }
}

function returnCoinFlipResult () {
  return Math.random() >= 0.5 ? "Heads! <:phweeHaha:951997660313841705>" : "Tails! <a:aethyTailR:985456739489042432>";
}

function shake8Ball () {
  return magicLines[ Math.floor(Math.random() * magicLines.length) ];
}

function sendLarryInfo () {
  return `<:phweeLarry:1023966100226060339> https://phwee-larry.carrd.co/`;
}

function timeUntilChristmas () {
  const today = new Date();
  const christmas = Date.parse(`25 Dec ${ today.getFullYear() } 00:00:00 EST`);
  const daysUntilChristmas = Math.ceil((christmas - Date.now()) / 86400000); //86400000 is the milliseconds in a day
  return `There are ${ daysUntilChristmas } days until Christmas. <a:wizzyDinkDonk:941202783758073857>`;
}

function startRubberLarry (interaction, myClient) {
  let typingTimeout = null;
  console.log(`Rubber Larry Started...`);

  //Add event listener for messages
  myClient.on(`messageCreate`, (userMessage) => {
    rubberLarryListener(userMessage, interaction, myClient);
  });

  //Add event listener for typing
  myClient.on('typingStart', (typing) => {
    console.log(`${ typing.user.username } is typing in ${ typing.channel.name }`);
    console.log(`Interaction username: ${ interaction.user.username }`);
    if (channel.name === "bot-testing" && user.username === interaction.user.username) {
      if (typingTimeout !== null) {
        clearTimeout(typingTimeout);
        console.log(`Timeout cleared....`);
      }
      console.log(`Timeout added...`);
      typingTimeout = setTimeout(() => {
        console.log(`Timeout reached...`);
        if (canReply) {
          channel.send("this is a generic reply");
          canReply = false;
        }
      }, 5000);
    }
  });
}

async function rubberLarryListener (userMessage, interaction, myClient) {
  if (userMessage.channel.name === "bot-testing" && userMessage.author.username === interaction.user.username) {
    console.log(`${ userMessage.author.username } has sent a message in ${ userMessage.channel.name }`);
    canReply = true;
    if (userMessage.content.includes("//amen")) {
      await userMessage.reply(
        `<:phweeLarry:1023966100226060339> **Larry says:** May Larry be with you.`
      );
      stopRubberLarry(myClient);
    }
  }
}

function stopRubberLarry (myClient) {
  myClient.removeListener(rubberLarryListener, () => console.log("/rubberlarry has stopped..."));
}

// Internal Functions - - - - - - - - - - - - - -
function setCommandsViaRest (logMessage, Commands) {
  const rest = new REST({ version: "10" }).setToken(process.env.myToken);
  rest
    .put(Routes.applicationGuildCommands(process.env.myClientID, process.env.myGuildID), Commands)
    .then((data) => console.log(logMessage))
    .catch(console.error);
}

module.exports = {
  createNewCommand,
  deleteAllCommands,
  deleteCommandByID,
  listCommands,
  returnCreateCommandModal,
  resetCommands,
  returnCoinFlipResult,
  shake8Ball,
  sendLarryInfo,
  timeUntilChristmas,
  startRubberLarry,
};