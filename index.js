/* eslint-disable no-unused-vars */
//manohar
const Discord = require("discord.js");

const dotenv = require("dotenv");

dotenv.config();

const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents });

client.on("ready", () => {
  console.log("ready!");
});

client.on("messageCreate", (msg) => {
  console.log(msg.content);
  if (msg.content) {
    var axios = require("axios");
    var API_key = "60334492ddbf059c9d3e63f3f8c788c3";
    var city = msg.content;
    var config = {
      method: "get",
      // url: "https://api.twitter.com/TwitterDev/status/1228393702244134912",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=60334492ddbf059c9d3e63f3f8c788c3`,
      headers: {},
    };
    var weather = "cool";
    axios(config)
      .then(function (response) {
        weather = response.data.weather[0].description;
        console.log(weather);
        if (weather) {
          msg.reply(weather);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

client.login(process.env.TOKEN);
