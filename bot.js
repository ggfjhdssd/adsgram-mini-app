require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Adsgram Bot is Live!'));
app.listen(port, '0.0.0.0', () => console.log(`✅ Server listening on port ${port}`));

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('👋 မင်္ဂလာပါ! ကြော်ငြာကြည့်ဖို့ အောက်က ခလုတ်ကို နှိပ်လိုက်ပါနော်။ ✨', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "📺 ကြော်ငြာကြည့်ရန်", web_app: { url: process.env.MINI_APP_URL } } ]
            ]
        }
    });
});

bot.catch((err) => {
    console.error(`⚠️ Bot Error: ${err.message}`);
});

bot.launch().then(() => console.log("🚀 Bot is running..."));
