import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import i18n from "../i18n";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation()
    const [IsBackBtn, setIsBackBtn] = useState(false);

    useEffect(() => {
        if (location.pathname === "/") {
            document.title = "Home - AccessibleSite"
            setIsBackBtn(false);
        } else {
            setIsBackBtn(true);
        }
    }, [location.pathname])

    const handleBack = () => {
        const pathParts = location.pathname.split("/").filter(Boolean);

        if (pathParts.length === 0) {
            // already at root
            navigate("/");
            return;
        }

        // remove the last part (/about/team -> /about)
        pathParts.pop();
        const parentPath = "/" + pathParts.join("/");

        navigate(parentPath || "/");
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-center border-b-2 items-center">
            {IsBackBtn && (
                <button
                    onClick={handleBack}
                    className="hover:bg-gray-200 text-center w-full h-full py-6 md:border-0 border-b-2 cursor-pointer hover:text-black"
                >
                    {t("back")}
                </button>
            )}
            {IsBackBtn && (
                <Link
                    to={'/'}
                    className="hover:bg-gray-200 text-center w-full md:border-l-2 md:border-r-2 md:border-b-0 border-b-2 h-full py-6 cursor-pointer hover:text-black"
                >
                    {t("main_page")}
                </Link>
            )}
            <Link
                to={`https://aowd.ge/${i18n.language}`}
                className="hover:bg-gray-200 text-center w-full h-full md:border-0  py-6 cursor-pointer hover:text-black"
            >
                {t("back_to_the_website")}
            </Link>
        </div>
    );
};

export default Footer;
