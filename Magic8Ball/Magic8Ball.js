const { magicLines } = require(`./Magic8Ball_Lines.js`);

async function send8BallMessage(userMessage) {
  let reply = magicLines[Math.floor(Math.random() * magicLines.length)];
  console.log(
    `User ${userMessage.author.username} has called for the Magic 8 Ball`
  );
  await userMessage.reply(`**Magic 8 Ball Says:** ${reply}`);
}
module.exports = { send8BallMessage };
