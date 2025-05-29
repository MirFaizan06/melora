import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Header from "./components/Header";
import BetaSignup from "./pages/BetaSignup";
import Shop from "@/pages/Shop";
import Support from "@/pages/Support";
import Footer from "./components/Footer";
import FAQ from "@/features/Support/FAQ";
import Dashboard from "./pages/Dashboard";
import PlayerLeaderboard from "./features/Leaderboard/PlayerLeaderboard";
import SongLeaderboard from "./features/Leaderboard/SongLeaderboard";
import AIBot from "./features/AI-bot/AIBot";

export default function App() {
  return (
    <>
      {/* <Toaster richColors position="top-center" /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beta-signup" element={<BetaSignup />} />
          <Route path="/player-leaderboard" element={<PlayerLeaderboard />} />
          <Route path="/song-leaderboard" element={<SongLeaderboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />

        {/* ✅ Chatbot appears globally on all pages */}
        <AIBot />
      </Router>
    </>
  );
}
