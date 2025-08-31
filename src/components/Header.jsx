import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
    const { theme, toggleTheme, increaseFont, decreaseFont, resetFont } = useTheme();

    return (
        <header className="flex justify-between items-center p-4 border-b border-gray-500">
            <div className="font-bold text-2xl">AccessibleSite</div>

            <nav className="flex gap-4 items-center">
                <a href="https://normal-website.com" className="underline">
                    Normal Website
                </a>

                {/* Font controls */}
                <div className="flex gap-2 items-center">
                    <button onClick={decreaseFont} className="px-2 border rounded-lg" aria-label="Decrease text size">
                        A-
                    </button>
                    <button onClick={resetFont} className="px-2 border rounded-lg" aria-label="Reset text size">
                        A
                    </button>
                    <button onClick={increaseFont} className="px-2 border rounded-lg" aria-label="Increase text size">
                        A+
                    </button>
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 border rounded-lg"
                    aria-label="Toggle theme"
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
            </nav>
        </header>
    );
};

export default Header;
