const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

const text = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Здравствуйте, ${ctx.message.from?.first_name ?? "Анонимный пользователь"}, вас приветствует бот компании "Север-Инвест". Опишите свою проблему.`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command("phones", async (ctx) => {
    try {
        await ctx.replyWithHTML(
            "<b>Список телефонов</b>",
            Markup.inlineKeyboard([[Markup.button.callback("Диспетчер", "dispatcher"), Markup.button.callback("Слесарь", "plumber")], [Markup.button.callback("Экстренные службы", "emergency")]])
        );
    } catch (error) {
        console.log(error);
    }
});

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery();
            if (src) {
                await ctx.replyWithPhoto({
                    source: src,
                });
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true,
            });
        } catch (error) {
            console.log(error);
        }
    });
}

addActionBot("dispatcher", false, text.textButton.dispatcher);
addActionBot("plumber", false, text.textButton.plumber);
addActionBot("emergency", false, text.textButton.emergency);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
