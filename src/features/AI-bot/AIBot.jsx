import { useState } from "react";
import { Bot, X } from "lucide-react";

export default function AIBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! I’m the Melora Assistant. Ask me anything about the game!" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate backend response (replace later with real logic)
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question: input }),
    });
    const { answer } = await response.json();

    setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 bg-zinc-900 text-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-purple-700 p-3 flex justify-between items-center">
            <span className="font-bold">Melora Assistant</span>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-96">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${
                  msg.sender === "bot" ? "text-green-400" : "text-blue-400 text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white"
            />
            <button onClick={handleSend} className="text-purple-400 font-bold">➤</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg"
        >
          <Bot />
        </button>
      )}
    </div>
  );
}
