import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import TTSText from "./TTSText";
import Logo from '../assets/awd_logo.webp'

const Header = () => {
    const { theme, toggleTheme, setThemeDark, increaseFont, decreaseFont, resetFont, setTextColorYellow, setTextColorGreen, resetTextColor, textColor } = useTheme();

    const { i18n, t } = useTranslation();
    const location = useLocation();

    const handleLanguageChange = ({ newLang }) => {
        if (newLang === i18n.language) return;

        const pathWithoutLang = location.pathname.replace(/^\/(en|ka)/, '');
        const newUrl = `/${newLang}${pathWithoutLang}${location.search}${location.hash}`;
        window.location.href = newUrl;
    };

    const resetSettings = () => {
        resetTextColor()
        resetFont()
        setThemeDark()
    }

    return (
        <header
            className={clsx(
            "flex justify-center h-[10dvh] items-center px-8 py-4 border-b bg-black text-white",
            theme === "dark" ? "border-gray-200" : "border-gray-700"
            )}
            role="banner"
        >
            <div className="container flex items-center justify-between">
                <div className="flex items-center">
                    <img
                    src={Logo}
                    alt="Organization logo"
                    className="h-14"
                    />
                </div>

                <div className="flex items-center space-x-5 text-white text-sm" role="navigation" aria-label="Accessibility controls">
                    <TTSText content={i18n.language === "en" ? t("georgian") : t("english")}>
                        <button
                            onClick={() =>
                                handleLanguageChange({
                                newLang: i18n.language === "en" ? "ka" : "en",
                                })
                            }
                            className="border border-white w-12 h-12 text-2xl flex justify-center items-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            aria-label="Toggle language"
                        >
                            {i18n.language === "en" ? "KA" : "EN"}
                        </button>
                    </TTSText>

                    <span aria-hidden="true">|</span>

                    <div className="flex space-x-1" role="group" aria-label="Font size controls">
                    <TTSText content={t("decrease_font")}>
                        <button
                            onClick={decreaseFont}
                            className="border border-white cursor-pointer w-12 h-12 text-sm font-bold hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            aria-label="Decrease font size"
                        >
                            A
                        </button>
                    </TTSText>
                    <TTSText content={t("increase_font")}>
                        <button
                            onClick={increaseFont}
                            className="border border-white w-12 h-12 text-2xl font-bold hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            aria-label="Increase font size"
                        >
                            A
                        </button>
                    </TTSText>
                    </div>

                    <span aria-hidden="true">|</span>

                    {/* Text Color Options */}
                    <div className="flex space-x-2 items-center" role="group" aria-label="Text color options">
                    <TTSText content={t("white_font")}>
                        <button
                            onClick={resetTextColor}
                            className={clsx(
                            "text-white font-bold text-3xl h-12 w-12 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                            textColor === "default" ? "border border-white" : "border-none"
                            )}
                            aria-label="Set default text color"
                        >
                            A
                        </button>
                    </TTSText>
                    <TTSText content={t("green_font")}>
                        <button
                            onClick={() => {
                                setTextColorGreen()
                                setThemeDark()
                            }}
                            className={clsx(
                            "text-green-500 font-bold text-3xl h-12 w-12 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400",
                            textColor === "green" ? "border border-white" : "border-none"
                            )}
                            aria-label="Set text color to green"
                        >
                            A
                        </button>
                    </TTSText>
                    <TTSText content={t("yellow_font")}>
                        <button
                            onClick={() => {
                                setTextColorYellow()
                                setThemeDark()
                            }}
                            className={clsx(
                            "text-yellow-400 font-bold text-3xl h-12 w-12 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
                            textColor === "yellow" ? "border border-white" : "border-none"
                            )}
                            aria-label="Set text color to yellow"
                        >
                            A
                        </button>
                    </TTSText>
                    </div>

                    <span aria-hidden="true">|</span>

                    {/* Reset Button */}
                    <TTSText content={t('default')}>
                        <button
                            title="Reset settings"
                            aria-label="Reset all accessibility settings"
                            className="text-white rotate-90 hover:text-gray-300 text-3xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                            onClick={resetSettings}
                        >
                            &#8635;
                    </button>
                    </TTSText>

                    <span aria-hidden="true">|</span>

                    {/* Theme Toggle */}
                    <TTSText content={theme === "light" ? t("dark_bg") : t("light_bg")}>
                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            aria-label={`Activate ${theme === "light" ? "dark" : "light"} mode`}
                        >
                            {theme === "light" ? "Dark Mode" : "Light Mode"}
                        </button>
                    </TTSText>
                </div>
            </div>
        </header>
    );
};

export default Header;
