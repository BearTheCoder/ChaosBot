const { MagicLines } = require(`./Magic8Ball_Lines.js`);

async function Magic8Ball (message) {
    let Reply = MagicLines[ Math.floor(Math.random() * MagicLines.length) ];
    console.log(`User ${ message.author.username } has called for the Magic 8 Ball`);
    await message.reply(`**Magic 8 Ball Says:** ${ Reply }`);
}
module.exports = { Magic8Ball };