import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import Leaderboard from "@/pages/Leaderboard";
import Shop from "@/pages/Shop";
import Feedback from "@/pages/Feedback";
import BetaSignup from "@/pages/BetaSignup";
import TestHero from "@/pages/TestHero";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "shop", element: <Shop /> },
      { path: "feedback", element: <Feedback /> },
      { path: "beta", element: <BetaSignup /> },
      { path: "test-video", element: <TestHero /> },
    ],
  },
]);
