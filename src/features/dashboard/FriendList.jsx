const friends = [
  { name: "AriaWave", status: "online" },
  { name: "TempoFox", status: "offline" },
  { name: "NovaHeart", status: "online" },
];

export default function FriendList() {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
      <h2 className="text-xl font-bold mb-4">🎵 Friends</h2>
      <ul className="space-y-3">
        {friends.map((f, i) => (
          <li key={i} className="flex justify-between text-white">
            <span>{f.name}</span>
            <span
              className={`text-sm ${
                f.status === "online" ? "text-green-400" : "text-zinc-500"
              }`}
            >
              {f.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
