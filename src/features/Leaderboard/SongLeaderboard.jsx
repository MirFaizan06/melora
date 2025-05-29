import { useState } from "react";
import { leaderboardSongs } from "@/data/leaderboardSongs";
import TopThreeStage from "./TopThreeStage";
import { Input } from "@/components/ui/input";

const difficulties = ["All", "Easy", "Medium", "Hard"];
const ITEMS_PER_PAGE = 10;

export default function SongLeaderboard() {
  const [search, setSearch] = useState("");
  const [song, setSong] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const filtered = leaderboardSongs
    .filter((entry) =>
      (song === "All" || entry.song === song) &&
      (difficulty === "All" || entry.difficulty === difficulty) &&
      (entry.name.toLowerCase().includes(search.toLowerCase()) || entry.id.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

  const uniqueSongs = Array.from(new Set(leaderboardSongs.map(e => e.song)));
  const top3 = filtered.slice(0, 3);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <section className="py-16 px-4 text-white bg-gradient-to-b from-black via-zinc-900 to-black min-h-screen">
      <h2 className="text-center text-4xl font-bold text-purple-400 mb-4">Song Leaderboard</h2>

      <TopThreeStage players={top3} />

      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 rounded-xl mt-10 space-y-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Input
            placeholder="Search by Player ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700"
          />
          <div className="flex gap-2">
            <select value={song} onChange={(e) => setSong(e.target.value)} className="bg-zinc-800 text-white px-3 py-2 rounded-md">
              <option value="All">All Songs</option>
              {uniqueSongs.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-zinc-800 text-white px-3 py-2 rounded-md">
              {difficulties.map(d => <option key={d}>{d}</option>)}
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
              <th className="p-4">Song</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map(player => (
                <tr key={player.id + player.song} className="hover:bg-zinc-800 transition">
                  <td className="p-4">{player.id}</td>
                  <td className="p-4">{player.name}</td>
                  <td className="p-4">{player.song}</td>
                  <td className="p-4">{player.difficulty}</td>
                  <td className="p-4 text-right text-green-400">{player.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">No matching entries found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md ${page === i + 1 ? 'bg-purple-600 text-white' : 'bg-zinc-700 text-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
