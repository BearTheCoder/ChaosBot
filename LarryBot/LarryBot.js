const { LarryWisdomLines } = require(`./LarryWisdom.js`);

async function LarryFunc(message) {
  let Reply = ``;
  if (message.content.toLowerCase().includes(`//larry`)) {
    Reply =
      LarryWisdomLines[ Math.floor(Math.random() * LarryWisdomLines.length) ];
  }
  else if (message.content.toLowerCase().includes(`//whoislarry`)) {
    Reply = `https://phwee-larry.carrd.co/`;
  }
  else return;
  console.log(`User ${message.author.username} has called for Larry`);
  await message.reply(`<:phweeLarry:1023966100226060339> *Larry says:* ${Reply}`);
}
module.exports = { LarryFunc };
