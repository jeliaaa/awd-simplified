import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
                    <Link
                        to={route.to}
                        className="block w-full text-center py-6 border-b-2 border-gray-500 hover:bg-gray-200 hover:text-black"
                    >
                        {route.title}
                    </Link>
                </li>))}
        </ul>
    );
};

export default AboutNav;
