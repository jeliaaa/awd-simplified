import { Link } from "react-router-dom"
import { useApiStore } from "../store/apiStore"
import { useEffect } from "react"
import TTSText from "../components/TTSText"

const Team = () => {
    const { fetchMembers, members } = useApiStore()

    useEffect(() => {
        fetchMembers()
    }, [])
    
    return (
        <ul className="flex flex-col gap-8 w-full">
            {members.map((member) => (
                <li key={member.id}>
                    <div
                        className="block w-full text-center py-3 border-b-2 border-gray-500 hover:bg-gray-200 hover:text-black"
                    >
                        <TTSText
                            className={'w-full h-full'}
                            link={`/about/team/${member.id}`}
                            content={`${member.firstname} ${member.lastname}`}
                        />
                    </div>
                </li>))}
        </ul>
    )
}

export default Team