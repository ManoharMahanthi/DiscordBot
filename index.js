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
  console.log(message);
  if (message) {
    // The code below sets the bearer token from your environment variables
    // To set environment variables on macOS or Linux, run the export command below from the terminal:
    // export BEARER_TOKEN='YOUR-TOKEN'
    const token =
      "AAAAAAAAAAAAAAAAAAAAAFLCTAEAAAAAcESrpNUKUv4heFb%2FfVKXSER%2BMKU%3DmFo5qaYH0jpe0LYWFjbLLYGyWTRaFxzZB46K4Z7q54OvWl2OFp";

    const endpointURL = "https://api.twitter.com/2/tweets?ids=";

    async function getRequest() {
      // These are the parameters for the API request
      // specify Tweet IDs to fetch, and any additional fields that are required
      // by default, only the Tweet ID and text are returned
      const params = {
        ids: "1278747501642657792,1255542774432063488", // Edit Tweet IDs to look up
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

    (async () => {
      try {
        // Make request
        const response = await getRequest();
        console.log(response.data[0].text);
        msg.reply(response.data[0].text);
      } catch (e) {
        console.log(e);
        process.exit(-1);
      }
      process.exit();
    })();

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
