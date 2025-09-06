import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TTSText from "../components/TTSText";

const AboutNav = () => {
    const { t } = useTranslation()

    const routes = [
        { id: 0, title: t("information"), to: "/about/info" },
        { id: 1, title: t("team"), to: "/about/team" },
    ]
    
    return (
        <ul className="flex flex-col gap-8 w-full">
            {routes.map((route) => (
                <li key={route.id}>
                    <div
                        className="block w-full text-center py-3 border-b-2 border-gray-500 hover:bg-gray-200 hover:text-black"
                    >
                        <TTSText
                            className={'w-full h-full'}
                            link={route.to}
                            content={route.title}
                        />
                    </div>
                </li>))}
        </ul>
    );
};

export default AboutNav;
