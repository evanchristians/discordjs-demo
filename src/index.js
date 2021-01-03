const Discord = require("discord.js");
const axios = require("axios");
const Cod = require("call-of-duty-api")();
const dotenv = require("dotenv");
dotenv.config();

const client = new Discord.Client();

const App = async () => {
  const loggedIn = await Cod.login(
    process.env.COD_EMAIL,
    process.env.COD_PASSWORD
  )
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (!loggedIn) return;

  Cod.MWstats("keenan_keenz7", Cod.platforms.psn)
    .then((output) => {
      console.log(output.lifetime);
    })
    .catch((err) => {
      console.log(err);
    });

  client.on("ready", () => {
    if (client.user) {
      console.log("Logged in as " + client.user.tag);
    }
  });

  client.on("message", (message) => {
    if (message.content.toLowerCase() === "tell me a joke") {
      axios({
        url: "https://icanhazdadjoke.com/",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => {
        message.channel.send(res.data.joke);
      });
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};

App();
