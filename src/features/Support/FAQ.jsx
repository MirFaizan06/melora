import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is Melora?",
    answer:
      "Melora is a rhythm piano game featuring 100s of MIDI-based tracks across various genres. Players compete on seasonal leaderboards with dynamic challenges.",
  },
  {
    question: "Is Melora free to play?",
    answer:
      "Yes, Melora is free to play. Some optional items and features are purchasable, but the core gameplay is fully accessible without payment.",
  },
  {
    question: "How does the leaderboard system work?",
    answer:
      "Leaderboards reset every month. Players earn scores based on accuracy, combo, and difficulty. Top players are rewarded with exclusive cosmetic items.",
  },
  {
    question: "Do you support external MIDI keyboards?",
    answer:
      "External MIDI keyboard support is planned in a future update. For now, gameplay is optimized for touch and keyboard inputs.",
  },
  {
    question: "How do seasons work?",
    answer:
      "Seasons introduce new songs, challenges, and reward tracks every month. Participating in seasonal events boosts your global ranking.",
  },
  {
    question: "Can I unlock songs permanently?",
    answer:
      "Yes. Most songs are unlocked by progressing, but you can unlock premium libraries or time-limited tracks from the shop as well.",
  },
  {
    question: "Are multiplayer or battle modes available?",
    answer:
      "Multiplayer modes are in development and will be released in future updates. For now, enjoy asynchronous competition via leaderboards.",
  },
  {
    question: "What are coins and gems used for?",
    answer:
      "Coins and gems are in-game currencies used to purchase cosmetic items, VIP access, and unlock special features or limited edition content.",
  },
  {
    question: "Is gifting available?",
    answer:
      "Yes. You can gift items to other players and receive a 10% discount when doing so. A gifting option is available in the shop modal.",
  },
  {
    question: "Where can I report bugs or give feedback?",
    answer:
      "Visit our contact page to submit surveys or direct feedback. We actively review submissions to improve the game.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-20 px-6 text-white">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-md"
            >
              <button
                className="w-full text-left flex justify-between items-center text-lg font-medium text-white focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="mt-4 text-zinc-400 leading-relaxed"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
