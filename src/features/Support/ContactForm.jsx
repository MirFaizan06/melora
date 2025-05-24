import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  "How satisfied are you with the variety of MIDI songs available?",
  "Do you find the difficulty levels well-balanced across songs?",
  "How engaging is the leaderboard and season system?",
  "Do you enjoy the visual presentation of the notes and background?",
  "How often do you participate in tournaments or challenges?",
  "Are the rewards and in-game items appealing to you?",
  "Do you think the genres offered cover your musical taste?",
  "Is the touch response and timing accurate in your experience?",
  "Would you recommend Melora to your friends or peers?",
  "What feature would you most like to see added or improved?",
];

const options = [
  "Very Unsatisfied",
  "Unsatisfied",
  "Neutral",
  "Satisfied",
  "Very Satisfied",
];

export default function ContactSurvey() {
  const [responses, setResponses] = useState({});
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="min-h-screen bg-zinc-950 text-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-purple-400 mb-4 text-center">
          Your Opinion Shapes Melora
        </h2>
        <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-10">
          Help us improve by answering a short survey. Your feedback helps us
          bring the best rhythm experience to our community of players.
        </p>

        <form onSubmit={handleSubmit} className="space-y-12">
          {questions.map((q, index) => (
            <div key={index} className="space-y-4">
              <p className="text-lg font-medium text-white">{index + 1}. {q}</p>
              <div className="flex flex-wrap gap-4">
                {options.map((option, i) => (
                  <label
                    key={i}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-all
                      ${
                        responses[index] === option
                          ? "bg-purple-600 text-white"
                          : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                      className="hidden"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <label className="text-lg font-medium">Any additional feedback?</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your message or feedback..."
              className="bg-zinc-800 text-white border border-zinc-700 min-h-[120px]"
            />
          </div>

          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Submit Survey
          </Button>

          {submitted && (
            <p className="text-green-400 text-sm mt-4">
              Thank you! Your responses have been recorded.
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
