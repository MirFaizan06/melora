import { useState } from "react";

const playerData = {
  player1: { name: "KairoVibes", email: "kairo@example.com", country: "Japan" },
  player2: { name: "EchoNova", email: "nova@example.com", country: "Germany" },
};

export default function PlayerInfo({ playerId }) {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(playerData[playerId]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Player Info</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md"
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400">Name:</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400">Email:</label>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400">Country:</label>
          <input
            name="country"
            value={data.country}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
          />
        </div>
      </div>
    </div>
  );
}
