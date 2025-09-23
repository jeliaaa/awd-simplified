import React, { useEffect } from 'react'
import { useApiStore } from '../store/apiStore';
import { useParams } from 'react-router-dom';

const ProjectsSingle = () => {
    const { loading, projects, fetchProjects } = useApiStore();
    const {year} = useParams()
    useEffect(() => {
        fetchProjects(year);
    }, [fetchProjects, year]);
    console.log(projects);



    if (loading) {
        return "loading..."
    }


    return (
        <div>ProjectsSingle</div>
    )
}

export default ProjectsSingle