import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { theme, toggleTheme, increaseFont, decreaseFont, resetFont } = useTheme();
    
    const { i18n } = useTranslation();
    const location = useLocation();

    const handleLanguageChange = ({ newLang }) => {
        if (newLang === i18n.language) return;

        const pathWithoutLang = location.pathname.replace(/^\/(en|ka)/, '');
        const newUrl = `/${newLang}${pathWithoutLang}${location.search}${location.hash}`;
        window.location.href = newUrl;
    };

    return (
        <header className="flex justify-between items-center p-4 border-b border-gray-500">
            <div className="font-bold text-2xl">AccessibleSite</div>

            <nav className="flex gap-4 items-center">
                <a href="https://normal-website.com" className="underline">
                    Normal Website
                </a>

                <button onClick={() => handleLanguageChange({
                    newLang: i18n.language === 'en' ? "ka" : 'en'
                })} className="px-2 border rounded-lg" aria-label="Decrease text size">
                    {i18n.language === 'en' ? "KA" : 'EN'}
                </button>

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
