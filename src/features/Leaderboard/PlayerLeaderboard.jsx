// components/leaderboards/PlayerLeaderboard.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { leaderboardPlayers } from "@/data/leaderboardPlayers";
import TopThreeStage from "./TopThreeStage";

const seasons = ["All Time", "Season 1", "Season 2"];
const ITEMS_PER_PAGE = 10;

export default function PlayerLeaderboard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const [season, setSeason] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = leaderboardPlayers
    .filter(p =>
      (season === "All Time" || p.season === season) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <section className="py-16 px-4 text-white bg-gradient-to-b from-black via-zinc-900 to-black min-h-screen">
      <h2 className="text-center text-4xl font-bold text-purple-400 mb-4">Player Leaderboard</h2>

      <TopThreeStage players={filtered.slice(0, 3)} />

      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 rounded-xl mt-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Input
            placeholder="Search by ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700"
          />
          <div className="flex gap-2">
            <select value={season} onChange={(e) => setSeason(e.target.value)} className="bg-zinc-800 text-white px-3 py-2 rounded-md">
              {seasons.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-zinc-800 text-white px-3 py-2 rounded-md">
              <option value="score">Score</option>
              <option value="name">Name</option>
              <option value="id">Player ID</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-zinc-800 text-white px-3 py-2 rounded-md">
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm text-left border border-zinc-700 rounded-xl overflow-hidden">
          <thead className="bg-zinc-800 text-purple-300">
            <tr>
              <th className="p-4">Player ID</th>
              <th className="p-4">Name</th>
              <th className="p-4 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map(player => (
                <tr key={player.id} className="hover:bg-zinc-800 transition">
                  <td className="p-4">{player.id}</td>
                  <td className="p-4">{player.name}</td>
                  <td className="p-4 text-right text-green-400">{player.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-6">No matching players found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-zinc-700 text-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
