import { useState } from "react";
import PlayerSwitcher from "@/features/dashboard/PlayerSwitcher";
import PlayerInfo from "@/features/dashboard/PlayerInfo";
import FriendList from "@/features/dashboard/FriendList";
import ChatBox from "@/features/dashboard/ChatBox";

export default function Dashboard() {
  const [activePlayer, setActivePlayer] = useState("player1");

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-purple-400">🎮 Player Dashboard</h1>

        <PlayerSwitcher activePlayer={activePlayer} setActivePlayer={setActivePlayer} />
        <PlayerInfo playerId={activePlayer} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FriendList />
          <ChatBox />
        </div>
      </div>
    </section>
  );
}
