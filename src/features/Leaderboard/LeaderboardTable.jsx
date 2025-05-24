import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { leaderboardData } from "@/data/LeaderboardData";

export default function LeaderboardTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredData = leaderboardData
    .filter((player) =>
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      player.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black py-20 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-5xl font-extrabold text-purple-400 mb-4">Melora Leaderboard</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Track the top performers in real-time. Filter, search, and find your rank among the best pianists.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Input
            placeholder="Search by Player ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 max-w-md"
          />

          <div className="flex items-center gap-4">
            <label className="text-gray-400">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700"
            >
              <option value="score">Score</option>
              <option value="name">Name</option>
              <option value="id">Player ID</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-700">
          <table className="w-full text-sm">
            <thead className="bg-zinc-800 text-purple-300">
              <tr>
                <th className="py-3 px-4 text-left">Player ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((player) => (
                  <tr
                    key={player.id}
                    className="border-t border-zinc-700 hover:bg-zinc-800 transition-colors"
                  >
                    <td className="py-3 px-4">{player.id}</td>
                    <td className="py-3 px-4">{player.name}</td>
                    <td className="py-3 px-4 text-right text-green-400">{player.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No players found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          Want your name here? Play more and aim for the top!
        </p>
      </div>
    </section>
  );
}
