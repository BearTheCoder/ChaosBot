const { magicLines } = require(`./Magic8Ball_Lines.js`);

module.exports.timeUntilChristmas = () => {
  const today = new Date();
  const christmas = Date.parse(`25 Dec ${today.getFullYear()} 00:00:00 EST`);
  const daysUntilChristmas = Math.ceil((christmas - Date.now()) / 86400000); //86400000 is the milliseconds in a day
  return `There are ${daysUntilChristmas} days until Christmas. <a:wizzyDinkDonk:941202783758073857>`;
};

module.exports.shake8Ball = (interaction) => {
  const resultOfShake = magicLines[Math.floor(Math.random() * magicLines.length)];
  return reply = interaction.options.getString('question') === null ?
    `Result: ${resultOfShake}` :
    `${interaction.options.getString('question')} \n Result: ${resultOfShake}`;
};

module.exports.returnCoinFlipResult = (interaction) => {
  const resultOfFilp = Math.random() >= 0.5 ? "Heads! <:phweeHaha:951997660313841705>" : "Tails! <a:aethyTailR:985456739489042432>";
  return reply = interaction.options.getString('options') === null ?
    `Result: ${resultOfFilp}` :
    `${interaction.options.getString('options')} \n Result: ${resultOfFilp}`;
};