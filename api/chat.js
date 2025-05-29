export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  // TODO: Replace this dummy logic with actual OpenAI or custom logic
  return res.status(200).json({
    reply: `You said: "${message}". I will soon be trained to answer game-specific queries.`,
  });
}
