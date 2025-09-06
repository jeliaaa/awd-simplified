import { useTranslation } from "react-i18next";
import TTSText from "../components/TTSText";
import teamEn from "../audio/team.mp3"
import teamGe from "../audio/team-ge.mp3"
import infoEn from "../audio/information.mp3"
import infoGe from "../audio/information-ge.mp3"
import DefTexts from "../components/DefTexts";

const AboutNav = () => {
    const { t } = useTranslation()

    const routes = [
        { id: 0, fileEn: infoEn, fileGe: infoGe, title: t("information"), to: "/about/info" },
        { id: 1, fileEn: teamEn, fileGe: teamGe, title: t("team"), to: "/about/team" },
    ]

    return (
        <ul className="flex flex-col gap-8 w-full">
            {routes.map((route) => (
                <li key={route.id}>
                    <div
                        className="block w-full text-center py-3 border-b-2 border-gray-500 hover:bg-gray-200 hover:text-black"
                    >
                        <DefTexts
                            className={"w-full h-full"}
                            fileEn={route.fileEn}
                            fileGe={route.fileGe}
                            content={route.title}
                            link={route.to}
                        />
                    </div>
                </li>))}
        </ul>
    );
};

export default AboutNav;
