// *****     Imports     *****
const { larryWisdomLines } = require(`./LarryWisdom.js`);
const { rubberLarryPhrases } = require(`./RubberLarryPhrases.js`);
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ apiKey: process.env.secret });
const openai = new OpenAIApi(config);

// *****     Exports     *****
module.exports.sendLarryWisdom = async (userMessage) => {
  let reply =
    larryWisdomLines[Math.floor(Math.random() * larryWisdomLines.length)];
  console.log(`User ${userMessage.author.username} has called for Larry`);
  await userMessage.reply(
    `<:phweeLarry:1023966100226060339> **Larry:** ${reply}`
  );
};

module.exports.sendHeyLarryWisdom = async (userMessage) => {
  let message = userMessage.content.toLowerCase();
  message = message.replace("//heylarry", "");
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0,
    max_tokens: 1000, // More tokens means more allowed in response.
  });

  response.then(res => {
    let reply = res.data.choices[0].text;
    console.log(`User ${userMessage.author.username} has called for Larry`);
    userMessage.reply(`<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`
    );
  });
};

module.exports.editHeyLarryWisdom = async (inputMessage, userMessage) => {

  console.log("Here");

  const edit = openai.createEdit({
    model: "text-davinci-edit-001",
    input: inputMessage,
    instruction: userMessage.content,
  });

  edit.then(res => {
    let reply = res.data.choices[0].text;
    console.log(`User ${userMessage.author.username} has called for Larry`);
    userMessage.reply(`<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`);
  });
};

module.exports.sendLarryInfo = () => `<:phweeLarry:1023966100226060339> https://phwee-larry.carrd.co/`;

// *****     Internal Functions     *****
async function rubberLarryListener (userMessage, rubberLarryArgs) {
  const isInSameChannel = (userMessage.channel.name === rubberLarryArgs.interaction.channel.name);
  const hasSameAuthor = (userMessage.author.username === rubberLarryArgs.interaction.user.username);
  if (hasSameAuthor && isInSameChannel) {
    rubberLarryArgs.canReply = true;
    if (userMessage.content.includes("//amen") || userMessage.content.includes("//stop")) {
      await userMessage.reply(`<:phweeLarry:1023966100226060339> May Larry be with you.`);
      stopRubberLarry(rubberLarryArgs);
    }
  }
}

function stopRubberLarry (rubberLarryArgs) {
  rubberLarryArgs.myClient.removeListener(rubberLarryListener, () => console.log("/rubberlarry has stopped..."));
  clearTimeout(rubberLarryArgs.typingTimeout);
}