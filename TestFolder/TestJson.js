async function TestJson(message, JSONObject, FileName_Script) {
  if (JSONObject.MessageCount == undefined) {
    JSONObject.MessageCount = 0;
  }
  JSONObject.Messages = {
    [`Message_${JSONObject.MessageCount}`]: message.toString(),
  };
  JSONObject.MessageCount++;
  fs.writeFile(FileName_Script, JSON.stringify(JSONObject, null, 2), (err) => {
    console.log("JSON successfully parsed...");
    console.log(err);
  });
  await message.reply("Hey, you talking KEYWORD? Parsed to JSON for later...");
}
