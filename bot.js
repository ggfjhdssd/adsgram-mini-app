require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

// --- 1. Express Server for Render Port Binding ---
const app = express();
const port = process.env.PORT || 10000; // Render က port 10000 ကို သုံးလေ့ရှိသည်
app.get('/', (req, res) => res.send('Bot is Live!'));
app.listen(port, '0.0.0.0', () => console.log(`✅ Server listening on port ${port}`));

// --- 2. Bot Setup ---
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Test Ad ကြည့်ရန် အောက်က ခလုတ်ကို နှိပ်ပါ။', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "📺 Watch Test Ad", web_app: { url: process.env.MINI_APP_URL } } ]
            ]
        }
    });
});

// --- 3. Conflict & Error Handling ---
bot.catch((err) => {
    console.error(`⚠️ Telegram Error: ${err.message}`);
});

// Bot ကို Conflict မဖြစ်အောင် polling ဖြင့်သာ စတင်မည်
bot.launch().then(() => console.log("🚀 Bot is running..."));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
