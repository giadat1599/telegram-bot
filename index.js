require("dotenv").config();

const { Telegraf } = require("telegraf");
const { exec } = require("child_process");

const myBot = new Telegraf(process.env.MY_BOT_TOKEN);

myBot.start((ctx) => ctx.reply("Welcome to tele bot"));

myBot.command("shutdown", (ctx) => {
  exec("sudo shutdown -h now", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  ctx.reply("Your machine will be shut down now");
});

myBot.launch();

process.once("SIGINT", () => myBot.stop("SIGINT"));
process.once("SIGTERM", () => myBot.stop("SIGTERM"));

console.log("myBot started");
