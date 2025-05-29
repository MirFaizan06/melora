import { useState } from "react";

const dummyPlayer = {
  id: "PLR001",
  name: "Aria",
  country: "Japan",
  avatar: "/placeholder/avatar.png",
  rank: 3,
  highestScore: 99800,
  averageAccuracy: 96.4,
  songsPlayed: 45,
  recentScores: [
    { song: "Nocturne of Stars", score: 99800, accuracy: 99.2, difficulty: "Hard" },
    { song: "Celestial Dance", score: 95000, accuracy: 95.1, difficulty: "Medium" },
    { song: "Midnight Waltz", score: 92600, accuracy: 93.8, difficulty: "Hard" },
  ],
};

export default function PlayerDashboard() {
  const [player] = useState(dummyPlayer);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black py-16 px-6 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-zinc-900 p-6 rounded-xl shadow-lg gap-6">
          <div className="flex items-center gap-6">
            <img src={player.avatar} alt="avatar" className="w-20 h-20 rounded-full border-4 border-purple-500" />
            <div>
              <h2 className="text-3xl font-bold text-purple-300">{player.name}</h2>
              <p className="text-gray-400">Player ID: {player.id}</p>
              <p className="text-gray-400">Country: {player.country}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Global Rank</p>
            <h3 className="text-4xl font-extrabold text-yellow-400">#{player.rank}</h3>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-800 p-5 rounded-xl text-center">
            <p className="text-gray-400">Highest Score</p>
            <h3 className="text-2xl text-green-400 font-bold">{player.highestScore}</h3>
          </div>
          <div className="bg-zinc-800 p-5 rounded-xl text-center">
            <p className="text-gray-400">Avg Accuracy</p>
            <h3 className="text-2xl text-blue-400 font-bold">{player.averageAccuracy}%</h3>
          </div>
          <div className="bg-zinc-800 p-5 rounded-xl text-center">
            <p className="text-gray-400">Songs Played</p>
            <h3 className="text-2xl text-purple-400 font-bold">{player.songsPlayed}</h3>
          </div>
        </div>

        {/* Recent Scores */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">Recent Scores</h3>
          <table className="w-full text-left text-sm border border-zinc-700 rounded-xl overflow-hidden">
            <thead className="bg-zinc-800 text-gray-400">
              <tr>
                <th className="py-3 px-4">Song</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {player.recentScores.map((entry, index) => (
                <tr key={index} className="border-t border-zinc-700 hover:bg-zinc-800 transition-colors">
                  <td className="py-3 px-4">{entry.song}</td>
                  <td className="py-3 px-4">{entry.difficulty}</td>
                  <td className="py-3 px-4 text-green-400">{entry.score}</td>
                  <td className="py-3 px-4 text-blue-400">{entry.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Placeholder for future expansions */}
        <div className="bg-zinc-800 p-6 rounded-xl text-center text-gray-500">
          More features like Performance Graphs, Full Match History, and Unlock Stats coming soon.
        </div>
      </div>
    </section>
  );
}
