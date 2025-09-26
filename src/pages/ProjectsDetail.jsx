import { useEffect } from 'react'
import { useApiStore } from '../store/apiStore';
import { useParams } from 'react-router-dom';
import TTSText from '../components/TTSText';

const ProjectsDetail = () => {
    const { loading, projectsDetail, fetchProjectsDetails } = useApiStore();
    const { id } = useParams()
    useEffect(() => {
        fetchProjectsDetails(parseInt(id));
    }, [fetchProjectsDetails, id]);
    console.log(projectsDetail);



    if (loading) {
        return 'loading...'
    }

    return (
        <div className='w-full'>
            {projectsDetail == null ? <div>No Such Project</div> :
                <div className='w-full border-y-2 py-5' key={projectsDetail.id}>
                    <h1><TTSText content={projectsDetail.name} /></h1>
                    <h2><TTSText content={projectsDetail.location} /></h2>
                    <h3><TTSText content={projectsDetail.date} /></h3>
                    <TTSText content={projectsDetail.description} html />
                    {/* <div className='w-full' dangerouslySetInnerHTML={{ __html: ProjectsDetail.description || "" }}></div> */}
                </div>}
        </div>
    )
}

export default ProjectsDetail