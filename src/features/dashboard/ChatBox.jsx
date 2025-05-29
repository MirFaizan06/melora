import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "AriaWave", text: "Hey! Great run today!" },
    { sender: "You", text: "Thanks! Let's compete again soon." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">💬 Messages</h2>
      <div className="flex-1 space-y-2 overflow-y-auto max-h-64 mb-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <strong className="text-purple-400">{m.sender}: </strong>
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
