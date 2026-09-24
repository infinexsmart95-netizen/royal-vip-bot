const axios = require('axios');
const VIP_LINK = "https://t.me/+aU8NKqNzrlNhZWY0";

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).send('👑 ROYAL 10X FLIPPER Bot is Online');
  }

  try {
    // Vercel kabhi kabhi body ko string bhej deta hai
    let update = req.body;
    if (typeof update === 'string') {
      update = JSON.parse(update);
    }

    console.log("Update received:", JSON.stringify(update));

    if (!update.chat_join_request) {
      return res.status(200).send('Not join request');
    }

    const from = update.chat_join_request.from;
    const userId = update.chat_join_request.user_chat_id || from.id;
    const firstName = from.first_name || 'Trader';
    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (!BOT_TOKEN) {
      console.log("BOT_TOKEN MISSING");
      return res.status(200).send('Token missing');
    }

    const text = `👑 𝗥𝗢𝗬𝗔𝗟 𝟭𝟬𝗫 𝗙𝗟𝗜𝗣𝗘𝗥 - 𝟭𝟬$ 𝗧𝗢 𝟭𝟬𝟬𝟬$ 👑

🔥 Hello ${firstName}!
Your Request Received ✅

💎 10$ to 1000$ Live Signals
📊 100X Setups
👑 VIP One Day Strategy

👇 𝗝𝗢𝗜𝗡 𝗡𝗢𝗪 👇`;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: userId,
      text: text,
      reply_markup: {
        inline_keyboard: [[{ text: "👑 JOIN 10$ TO 1000$ VIP", url: VIP_LINK }]]
      }
    });

    console.log("Message sent to", userId);
    return res.status(200).send('OK');

  } catch (e) {
    console.log("ERROR:", e.response ? e.response.data : e.message);
    return res.status(200).send('Error handled');
  }
};
