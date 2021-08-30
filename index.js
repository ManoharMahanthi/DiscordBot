/* eslint-disable no-unused-vars */
//manohar///
//hai//////
//kakljnckjbkjablkfbkj
//old
const needle = require("needle");
const Discord = require("discord.js");

const dotenv = require("dotenv");

dotenv.config();

const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents });

client.on("ready", () => {
  console.log("ready!");
});

client.on("messageCreate", (msg) => {
  message = msg.content.toLocaleLowerCase();
  if (message == "hi") msg.reply("Pora puka");
  if (message == "kingu") msg.reply("Yaaayyy");
  console.log(message);
  if (message) {
    // The code below sets the bearer token from your environment variables
    // To set environment variables on macOS or Linux, run the export command below from the terminal:
    // export BEARER_TOKEN='YOUR-TOKEN'
    const token =
      "AAAAAAAAAAAAAAAAAAAAAFLCTAEAAAAAcESrpNUKUv4heFb%2FfVKXSER%2BMKU%3DmFo5qaYH0jpe0LYWFjbLLYGyWTRaFxzZB46K4Z7q54OvWl2OFp";
    QUERY = encodeURI(message);
    // const endpointURL = "https://api.twitter.com/2/tweets?ids=";
    // const endpointURL = `https://api.twitter.com/2/tweets/search/recent?query=${QUERY}`;
    // const endpointURL =
    // "https://api.twitter.com/2/tweets/search/recent?query=%2523caturday%2520has%253Aimages%2520-is%253Aretweet";
    const endpointURL = "https://api.twitter.com/2/tweets/search/recent?query=";
    async function getRequest() {
      // These are the parameters for the API request
      // specify Tweet IDs to fetch, and any additional fields that are required
      // by default, only the Tweet ID and text are returned
      const params = {
        // ids: "1423830326665650179", // Edit Tweet IDs to look up
        query: "musk",
        "tweet.fields": "lang,author_id", // Edit optional query parameters here
        "user.fields": "created_at", // Edit optional query parameters here
      };

      // this is the HTTP header that adds bearer token authentication
      const res = await needle("get", endpointURL, params, {
        headers: {
          "User-Agent": "v2TweetLookupJS",
          authorization: `Bearer ${token}`,
        },
      });

      if (res.body) {
        return res.body;
      } else {
        throw new Error("Unsuccessful request");
      }
    }
    var data;
    (async () => {
      try {
        // Make request
        const response = await getRequest();
        if (response) {
          console.log(response);
          i = 0;
          while (response.data[i].lang != "en") {
            i++;
          }
          data = response.data[i].text;

          // console.log(window.btoa(message));
          msg.reply(data);
          console.log(data);
        }
      } catch (e) {
        console.log(e);
        process.exit(-1);
      }
      // process.exit();
    })();

    // msg.reply(data);

    // var axios = require("axios");
    // var API_key = "60334492ddbf059c9d3e63f3f8c788c3";
    // var city = message;
    // var config = {
    //   method: "get",
    //   // url: "https://api.twitter.com/TwitterDev/status/1228393702244134912",
    //   url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=60334492ddbf059c9d3e63f3f8c788c3`,
    //   headers: {},
    // };
    // var weather = "cool";
    // axios(config)
    //   .then(function (response) {
    //     weather = response.data.weather[0].description;
    //     console.log(weather);
    //     if (weather) {
    //       msg.reply(weather);
    //     }
    //   })
    //   .catch(function (error) {
    //     // console.log(error);
    //   });
  }
});

client.login(process.env.TOKEN);
