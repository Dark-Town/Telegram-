const emojis = ['😂', '👍', '❤️', '🔥', '👏', '🎉', '😎', '👀', '💯'];

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  if (req.method === 'GET') {
    return res.status(200).send('Webhook is ready!');
  }

  if (req.method === 'POST') {
    try {
      const update = req.body;

      if (update.message && update.message.chat.type !== 'private' && update.message.message_id) {
        const chatId = update.message.chat.id;
        const messageId = update.message.message_id;
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            reply_to_message_id: messageId,
            text: randomEmoji
          })
        });
      }

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Error handling webhook:', err);
      return res.status(500).send('Internal Server Error');
    }
  }

  return res.status(404).send('Not Found');
}
