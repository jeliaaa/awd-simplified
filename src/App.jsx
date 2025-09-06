import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Info from "./pages/Info";
import AboutNav from "./pages/AboutNav";
import Team from "./pages/Team";
import TeamSingle from "./pages/TeamSingle";

const App = () => {
  const { theme, fontSize, textColor } = useTheme();

  return (
    <>
      <Header />
      <div
        className={`min-h-[90dvh] ${theme === "light" ? "bg-white text-black" : "bg-black text-white"
          }`}
        style={{ fontSize: `${fontSize}px`, color: textColor === "default" ? (theme === "light" ? "black" : "white") : textColor }}
      >
        <main className="flex justify-between flex-col w-full items-center min-h-[90dvh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutNav />} />
            <Route path="/about/info" element={<Info />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/team/:id" element={<TeamSingle />} />
          </Routes>
          <Footer />
        </main>
      </div>

    </>
  );
};

export default App;
