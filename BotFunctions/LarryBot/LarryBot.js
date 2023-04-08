// *****     Imports     *****
const { larryWisdomLines } = require(`./LarryWisdom.js`);
const { Configuration, OpenAIApi } = require("openai");
const { messages } = require("./LarryMessages.js");
const config = new Configuration({ apiKey: process.env.secret });
const openai = new OpenAIApi(config);

// *****     Exports     *****
module.exports.sendLarryWisdom = async (userMessage) => {
  let reply = larryWisdomLines[Math.floor(Math.random() * larryWisdomLines.length)];
  console.log(`User ${userMessage.author.username} has called for Larry`);
  await userMessage.reply(`<:phweeLarry:1023966100226060339> **Larry:** ${reply}`);
};

// Text completion not chat completion using Davinci.
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

// Chat completion using GPT3.5 (messages need to be appended to an array for larry to remember the conversations.)
module.exports.openAiChatCompletion_Larry = async (userMessage) => {

  let message = userMessage.content.toLowerCase();
  message = message.replace("//heylarry", "");

  messages.push({ role: "user", content: message });

  const response = openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  response.then(res => {
    let reply = res.data.choices[0].message.content;
    console.log(`User ${userMessage.author.username} has called for Larry`);
    userMessage.reply(`<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`);
    messages.push({ role: "assistant", content: reply });
  });
};


module.exports.editHeyLarryWisdom = async (inputMessage, userMessage) => {

  messages.push({ role: "user", content: inputMessage });

  const edit = openai.createEdit({
    model: "text-davinci-edit-001",
    input: inputMessage,
    instruction: userMessage.content,
  });

  edit.then(res => {
    let reply = res.data.choices[0].text;
    console.log(`User ${userMessage.author.username} has called for Larry`);
    userMessage.reply(`<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`);
    messages.push({ role: "assistant", content: reply });
  });
};

module.exports.sendLarryInfo = () => `<:phweeLarry:1023966100226060339> https://phwee-larry.carrd.co/`;
