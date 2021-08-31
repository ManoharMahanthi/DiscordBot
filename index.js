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
  if(msg.author.bot) return;
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
    

    const userId = "70931004";
const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 100,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    console.dir(userTweets, {
        depth: null
    });
    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`);

}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

getUserTweets();
}
  });

client.login(process.env.TOKEN);
