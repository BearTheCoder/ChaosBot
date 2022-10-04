const { LarryWisdomLines } = require(`./LarryWisdom.js`);

async function LarryFunc(message) {
  let Reply =
    LarryWisdomLines[Math.floor(Math.random() * LarryWisdomLines.length)];
  console.log(`User ${message.author.username} has called for Larry`);
  await message.reply(
    `<:phweeLarry:1023966100226060339> **Larry says:** ${Reply}`
  );
}

async function LarryCard(message) {
  let Reply = `https://phwee-larry.carrd.co/`;
  console.log(`User ${message.author.username} has called for Larry Card`);
  await message.reply(`<:phweeLarry:1023966100226060339> ${Reply}`);
}
module.exports = { LarryFunc, LarryCard };
