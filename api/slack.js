const Slackbot = require("slackbots")

const bot = new Slackbot({
  token: process.env.SLACK_TOKEN,
  name: "pair_bot"
})
bot.on("start", function() {
  var params = {
    icon_emoji: ":cat:"
  }
})

bot.on("error", err => console.log(err))

bot.postMessageChannel(
  "pair_me",
  `Hey, @${user1}, @${user2} is available to help!`
)
