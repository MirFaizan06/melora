// components/leaderboards/TopThreeStage.jsx
export default function TopThreeStage({ players }) {
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div className="flex justify-center gap-6 mt-6">
      {players.slice(0, 3).map((player, index) => (
        <div
          key={player.id}
          className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-purple-600 rounded-xl p-4 text-center w-40 shadow-lg"
        >
          <div className="text-4xl">{medals[index]}</div>
          <div className="mt-2 font-bold text-lg">{player.name}</div>
          <div className="text-sm text-gray-400">{player.id}</div>
          <div className="text-green-400 font-bold text-xl mt-1">{player.score}</div>
        </div>
      ))}
    </div>
  );
}
