import { Link } from "react-router-dom";

const Home = () => {
    const routes = [
        { id: 0, title: "About", to: "/about" },
        { id: 1, title: "Projects", to: "/projects" },
        { id: 2, title: "Stories of women with disabilities", to: "/stories" },
        { id: 3, title: "Calendar", to: "/calendar" },
        { id: 4, title: "Blog", to: "/blog" },
        { id: 5, title: "Contact Us", to: "/contact-us" },
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

export default Home;
