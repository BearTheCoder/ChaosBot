# ChaosBot
 Discord bot used for testing inside of the Aethy and Phwee guild.

 The gitIgnore generally would exclude node_modules, but for some reason Heroku requires node and aws_sdk to be included on GitHub. Hence why all 4,000 files were included.

 Currently LarryBot and Magic8Ball are similar working though although they are "slash functions" by definition, technically the aren't ACTUALLY slash functions by discord standards.
 This is a HUGE negative as instead of directly targeting the code whenever the slash function is called, the code instead is constantlty reading each message looking for the matching phrase.
 This, currently, will not cause issues overall as there are not too many messages being parsed per minute, but this will be a downfall in the future as the server grows.

 The current goal is to convert both LarryBot and Magic8Ball to slash functions and follow up with RoleUpdate.
