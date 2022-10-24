const { larryWisdomLines } = require(`./LarryWisdom.js`);

async function sendLarryWisdom(userMessage) {
  let reply =
    larryWisdomLines[Math.floor(Math.random() * larryWisdomLines.length)];
  console.log(`User ${userMessage.author.username} has called for Larry`);
  await userMessage.reply(
    `<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`
  );
}
module.exports = { sendLarryWisdom };
