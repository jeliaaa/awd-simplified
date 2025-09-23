import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TTSText from "../components/TTSText";
import DefBtn from "../components/DefBtn";

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
                    <DefBtn>
                        <TTSText
                            className={'w-full h-full'}
                            content={route.title}
                            link={route.to}
                        />
                    </DefBtn>
                </li>))}
        </ul>
    );
};

export default Home;
