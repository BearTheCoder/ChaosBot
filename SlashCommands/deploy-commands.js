const { REST, SlashCommandBuilder, Routes } = require("discord.js");

function createNewCommand(commandName, commandDescription, clientId, guildId) {
  const commands = [
    new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(commandDescription),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "10" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then((data) =>
      console.log(
        `Successfully registered ${data.length} application commands.`
      )
    )
    .catch(console.error);
}

function deleteAllCommands(clientId, guildId) {
  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log("Successfully deleted all guild commands."))
    .catch(console.error);
}

function deleteCommandByID(clinetId, guildId, commandId) {
  rest
    .delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
    .then(() => console.log("Successfully deleted guild command"))
    .catch(console.error);
}

module.exports = { createNewCommand, deleteAllCommands, deleteCommandByID };
