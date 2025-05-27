import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Header from "./components/Header";
import BetaSignup from "./pages/BetaSignup";
import Leaderboard from "@/pages/Leaderboard";
import Shop from "@/pages/Shop";
import Support from "@/pages/Support";
import Footer from "./components/Footer";
import FAQ from "@/features/Support/FAQ";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      {/* <Toaster richColors position="top-center" /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beta-signup" element={<BetaSignup />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faqs" element={<FAQ />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
