import { Link } from "react-router-dom"
import { useApiStore } from "../store/apiStore"
import { useEffect } from "react"

const Team = () => {
    const { fetchMembers, members } = useApiStore()

    useEffect(() => {
        fetchMembers()
    }, [])
    
    return (
        <ul className="flex flex-col gap-8 w-full">
            {members.map((member) => (
                <li key={member.id}>
                    <Link
                        to={`/about/team/${member.id}`}
                        className="block w-full text-center py-6 border-b-2 border-gray-500 hover:bg-gray-200 hover:text-black"
                    >
                        {member.firstname} {member.lastname}
                    </Link>
                </li>))}
        </ul>
    )
}

export default Team