/* eslint-disable no-unused-vars */
const Discord = require("discord.js");

const dotenv = require("dotenv");

const config = require("./config.json");

dotenv.config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.on("ready", () => {
  console.log("ready!");
});
client.on('messageCreate', msg => {
	if(!msg.content.startsWith(config.prefix)) return;

	const args = msg.content.substring(config.prefix.length).split(/ +/);

	switch (args[0]) {
		case "hello" :
			msg.reply("hello");
			break;
		case "say" :
			msg.reply(args.slice(1).join(" "));
			break;
	}

})

client.login(process.env.TOKEN);
