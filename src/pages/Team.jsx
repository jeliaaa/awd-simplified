import { Link } from "react-router-dom"

const Team = () => {
    const routes = [
        { id: 0, title: "Name Surname" },
        { id: 1, title: "Name Surname" },
    ]
    return (
        <ul className="flex flex-col gap-8 w-full">
            {routes.map((route) => (
                <li key={route.id}>
                    <Link
                        to={`/about/team/${route.id}`}
                        className="block w-full text-center py-6 border-b-2 border-gray-500 hover:bg-gray-200 hover:text-black"
                    >
                        {route.title} {route.id}
                    </Link>
                </li>))}
        </ul>
    )
}

export default Team