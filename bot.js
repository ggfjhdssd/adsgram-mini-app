require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

// --- 1. Render Port Binding & Keep-alive ---
// Render မှာ No open ports detected error မတက်အောင် ဒါကို ထည့်ရပါတယ်
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Adsgram Bot is Live!'));
app.listen(port, () => console.log(`✅ Server is listening on port ${port}`));

// --- 2. Bot Setup ---
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('👋 မင်္ဂလာပါ! ကြော်ငြာကြည့်ဖို့ အောက်က Button ကို နှိပ်ပေးပါနော်။ ✨', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "📺 ကြော်ငြာကြည့်ရန်", web_app: { url: process.env.MINI_APP_URL } } ]
            ]
        }
    });
});

// User က bot ကို block ထားရင် bot မရပ်သွားအောင် ကာကွယ်ခြင်း
bot.catch((err) => {
    console.error(`⚠️ Bot Error: ${err.message}`);
});

bot.launch().then(() => console.log("🚀 Bot started on Render!"));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
