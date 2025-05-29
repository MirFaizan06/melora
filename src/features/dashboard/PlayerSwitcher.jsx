const players = [
  { id: "player1", name: "KairoVibes" },
  { id: "player2", name: "EchoNova" },
];

export default function PlayerSwitcher({ activePlayer, setActivePlayer }) {
  return (
    <div className="space-y-2">
      <label className="text-gray-400">Switch Profile:</label>
      <select
        value={activePlayer}
        onChange={(e) => setActivePlayer(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 text-white px-3 py-2 rounded-md"
      >
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
