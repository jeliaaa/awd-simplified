import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useApiStore } from '../store/apiStore';
import TTSText from '../components/TTSText';

const TeamSingle = () => {
    const { id } = useParams();
    const { fetchMembersSingle, membersSingle: member } = useApiStore()

    useEffect(() => {
        fetchMembersSingle(id)
    }, [])
    
    return (
        <div className='p-6 w-full'>
            <h1 className='font-bold'>
                <TTSText content={`${member?.firstname} ${member?.lastname}`}/>
            </h1>
            <TTSText html content={member?.description}/>
        </div>
    )
}

export default TeamSingle