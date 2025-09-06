import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TTSText from "../components/TTSText";

const Home = () => {
    const { t } = useTranslation()

    const routes = [
        { id: 0, title: t("about"), to: "/about" },
        { id: 1, title: t("projects"), to: "/projects" },
        { id: 2, title: t("stories_of_women_with_disabilities"), to: "/stories" },
        { id: 3, title: t("calendar"), to: "/calendar" },
        { id: 4, title: t("blog"), to: "/blog" },
        { id: 5, title: t("contact"), to: "/contact-us" },
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
                            content={route.title}
                            link={route.to}
                        />
                    </div>
                </li>))}
        </ul>
    );
};

export default Home;
