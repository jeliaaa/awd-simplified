import React, { useEffect } from 'react'
import { useApiStore } from '../store/apiStore';
import { useParams } from 'react-router-dom';
import TTSText from '../components/TTSText';

const ProjectsSingle = () => {
    const { loading, projects, fetchProjects } = useApiStore();
    const { year } = useParams()
    useEffect(() => {
        fetchProjects(year);
    }, [fetchProjects, year]);
    console.log(projects);



    if (loading) {
        return "loading..."
    }


    return (
        <div className='w-full'>
            {projects.map((project) => (
                <div className='w-full border-y-2 py-5' key={project.id}>
                    <h1><TTSText content={project.name} /></h1>
                    <h2><TTSText content={project.location} /></h2>
                    <h3><TTSText content={project.date} /></h3>
                    <div className='w-full' dangerouslySetInnerHTML={{__html : project.description || ""}}></div>
                </div>
            ))}
        </div>
    )
}

export default ProjectsSingle