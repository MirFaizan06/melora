export default async function handler(req, res) {
  const { question } = JSON.parse(req.body);

  // Dummy training data (expand or integrate your own logic)
  const faq = [
    { q: "what is melora", a: "Melora is a rhythm-based piano game by NxT LvL Studios." },
    { q: "how to play", a: "Tap notes in sync with music. Accuracy boosts your score." },
    { q: "how to get vip", a: "You can buy VIP from the in-game shop for premium features." },
    { q: "can i gift items", a: "Yes, gifting is available with a 10% discount." },
    { q: "what are rings", a: "Rings are score multiplier buffs you can equip." },
  ];

  const match = faq.find((item) =>
    question.toLowerCase().includes(item.q)
  );

  res.status(200).json({
    answer: match ? match.a : "Sorry, I don’t have an answer for that yet. Try asking something else about Melora.",
  });
}
