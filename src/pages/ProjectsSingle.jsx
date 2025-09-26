import React, { useEffect } from 'react'
import { useApiStore } from '../store/apiStore';
import { useParams } from 'react-router-dom';
import TTSText from '../components/TTSText';
import DefBtn from '../components/DefBtn';
import { useTranslation } from 'react-i18next';

const ProjectsSingle = () => {
    const { loading, projects, fetchProjects } = useApiStore();
    const { year } = useParams()
    const { t } = useTranslation()
    useEffect(() => {
        fetchProjects(year);
    }, [fetchProjects, year]);
    console.log(projects);



    if (loading) {
        return "loading..."
    }


    return (
        <div className='w-full'>
            {projects.length > 0 ?
                <>
                    {projects.map((project) => (
                        <div className='w-full border-y-2 py-5' key={project.id}>
                            <h1><TTSText content={project.name} /></h1>
                            <h2><TTSText content={project.location} /></h2>
                            <h3><TTSText content={project.date} /></h3>
                            <TTSText content={project.description} html />
                            <DefBtn >
                                <TTSText link={`${project.id}`} content={t('open')} />
                            </DefBtn>
                        </div>
                    ))}
                </> : <p>No projects for that year</p>}
        </div>
    )
}

export default ProjectsSingle