import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import BackBtn from "./components/BackBtn";
import Info from "./pages/Info";
import AboutNav from "./pages/AboutNav";
import Team from "./pages/Team";
import TeamSingle from "./pages/TeamSingle";

const App = () => {
  const { theme, fontSize } = useTheme();
  const { pathname } = useLocation()
  const [IsBackBtn, setIsBackBtn] = useState(false);
  useEffect(() => {
    if (pathname === "/") {
      document.title = "Home - AccessibleSite"
      setIsBackBtn(false);
    } else {
      setIsBackBtn(true);
    }
  }, [pathname])

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-white text-black" : "bg-black text-white"
        }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <Header />
      <main className="pb-10 flex justify-between flex-col w-full items-center min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutNav />} />
          <Route path="/about/info" element={<Info />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/team/:id" element={<TeamSingle />} />
        </Routes>
        {IsBackBtn && <BackBtn />}
      </main>
    </div>
  );
};

export default App;
