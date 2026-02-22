require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

// --- Render အတွက် Port ဖွင့်ပေးခြင်း ---
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Adsgram Bot is Live!'));
app.listen(port, () => console.log(`✅ Server is running on port ${port}`));

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('မင်္ဂလာပါရှင် ✨ ကြော်ငြာကြည့်ဖို့ အောက်က Button ကို နှိပ်ပေးပါနော်။', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "📺 ကြော်ငြာကြည့်ရန်", web_app: { url: process.env.MINI_APP_URL } } ]
            ]
        }
    });
});

// Bot မရပ်သွားအောင် Error Handling ထည့်ခြင်း
bot.catch((err) => {
    console.error("⚠️ Bot Error:", err.message);
});

bot.launch().then(() => console.log("🚀 Bot started on Render!"));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
