const axios = require('axios');
const VIP_LINK = "https://t.me/+aU8NKqNzrlNhZWY0";

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).send('👑 ROYAL 10X FLIPPER Bot is Online - 10$ to 1000$');
  }
  if (req.method !== 'POST') {
    return res.status(405).send('Not Allowed');
  }

  try {
    const update = req.body;
    if (!update.chat_join_request) {
      return res.status(200).send('OK');
    }

    const joinRequest = update.chat_join_request;
    const userId = joinRequest.user_chat_id || joinRequest.from.id;
    const firstName = joinRequest.from.first_name || 'Trader';
    const BOT_TOKEN = process.env.BOT_TOKEN;

    const message = `👑 𝗥𝗢𝗬𝗔𝗟 𝟭𝟬𝗫 𝗙𝗟𝗜𝗣𝗘𝗥 - 𝟭𝟬$ 𝗧𝗢 𝟭𝟬𝟬𝟬$ 👑

🔥 Hello ${firstName}!

Your Request For 10$ to 1000$ Challenge Received! ✅

💎 𝗪𝗛𝗔𝗧 𝗬𝗢𝗨 𝗪𝗜𝗟 𝗚𝗘𝗧:
⚡ 10$ to 1000$ Live Signals
📊 100X Premium Setups
👑 VIP One Day Flipping Strategy

👇 𝗝𝗢𝗜𝗡 𝗡𝗢𝗪 & 𝗦𝗧𝗔𝗥𝗧 𝗙𝗟𝗜𝗣𝗣𝗜𝗡𝗚 👇`;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: userId,
      text: message,
      reply_markup: {
        inline_keyboard: [
          [{ text: "👑 JOIN 10$ TO 1000$ VIP", url: VIP_LINK }]
        ]
      }
    });

    // Request ko approve nahi karna
    return res.status(200).send('OK');
  } catch (e) {
    console.log(e.response ? e.response.data : e.message);
    return res.status(200).send('Error handled');
  }
};
