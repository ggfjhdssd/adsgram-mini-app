require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

// --- 1. Render Port Binding (Error မတက်စေရန်) ---
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Adsgram Bot is Running!'));
app.listen(port, () => console.log(`✅ Server is live on port ${port}`));

// --- 2. Bot Setup ---
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const welcomeMsg = `👋 မင်္ဂလာပါ ${ctx.from.first_name}\n\nကြော်ငြာကြည့်ပြီး ငွေရှာဖို့အတွက် အောက်က '📺 ကြော်ငြာကြည့်ရန်' ခလုတ်ကို နှိပ်လိုက်ပါနော်။ ✨`;
    
    ctx.reply(welcomeMsg, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "📺 ကြော်ငြာကြည့်ရန်", web_app: { url: process.env.MINI_APP_URL } } ]
            ]
        }
    }).catch(() => {}); // Send error handling
});

// --- 3. Error Handling (Bot Crash မဖြစ်စေရန်) ---
bot.catch((err) => {
    console.error(`⚠️ Telegram Error: ${err.message}`);
});

bot.launch().then(() => console.log("🚀 Bot is successfully launched!"));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
