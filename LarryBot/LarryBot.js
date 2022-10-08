const { larryWisdomLines } = require(`./LarryWisdom.js`);

async function sendLarryWisdom(userMessage) {
  let reply =
    larryWisdomLines[Math.floor(Math.random() * larryWisdomLines.length)];
  console.log(`User ${userMessage.author.username} has called for Larry`);
  await userMessage.reply(
    `<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`
  );
}

async function sendLarryInfo(userMessage) {
  let reply = `https://phwee-larry.carrd.co/`;
  console.log(`User ${userMessage.author.username} has called for Larry Card`);
  await userMessage.reply(`<:phweeLarry:1023966100226060339> ${reply}`);
}
module.exports = { sendLarryWisdom, sendLarryInfo };
