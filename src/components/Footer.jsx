import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import i18n from "../i18n";
import TTSText from "./TTSText";

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
                <div
                    className="hover:bg-gray-200 text-center w-full h-full py-3 md:border-0 border-b-2 cursor-pointer hover:text-black"
                >
                    <TTSText content={t("back")} func={handleBack} className={"w-full h-full"}/>
                </div>
            )}
            {IsBackBtn && (
                <div
                    className="hover:bg-gray-200 text-center w-full md:border-l-2 md:border-r-2 md:border-b-0 border-b-2 h-full py-3 cursor-pointer hover:text-black"
                >
                    <TTSText content={t("main_page")} link={'/'} className={"w-full h-full"}/>
                </div>
            )}
            <div
                className="hover:bg-gray-200 text-center w-full h-full py-3 md:border-0 border-b-2 cursor-pointer hover:text-black"
            >
                <TTSText content={t("back_to_the_website")} link={`https://aowd.ge/${i18n.language}`} className={"w-full h-full"}/>
            </div>
        </div>
    );
};

export default Footer;
