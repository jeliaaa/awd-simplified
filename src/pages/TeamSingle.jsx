import React from 'react'
import { useParams } from 'react-router-dom';

const TeamSingle = () => {
    const { id } = useParams();
    return (
        <div className='p-6'>
            <h1 className='font-bold'>Name Surname {id}</h1>
            <p>
                NGO Alliance of Women with Disabilities was founded on June 25, 2021, in Batumi, Georgia. It represents a Disabled Peoples Organization (DPO) which means that the organization is managed and run by the persons with disabilities at the board and membership levels. The focus of the organization is on women with disabilities. The non-disabled women (ex.: parents and/or legal representatives of girls with disabilities, other women and organizations focusing on women) are welcome to join as well, however the number of non-disabled women/persons with disabilities should not exceed 25% of its members. The Alliance works on municipal, regional and national levels.
                <br />
                The mission of the Alliance is to promote equality and contribute to the development and inclusion of women and girls with disabilities in social, economic and political life of the society.
                <br />
                The objectives of the organization: (a) raise awareness on human rights and freedoms of women with disabilities; (b) develop advocacy and self-advocacy skills among women and girls with disabilities.
                <br />
                The Alliance offers the hotline service to women with disabilities to respond to their urgent needs and provide information, consultation and support per their needs. It also works on the economic empowerment of women with disabilities, as without financial independence it is difficult for a person to have an independent and dignified life. The organization manages the chat group on social network where women with disabilities from different municipalities share information and help each other to overcome various barriers.
                <br />
                Besides, two-year experience of implementing the activities illustrated that level of awareness of women with disabilities living in different areas is different. There is a need to inform the women and girls with disabilities about their rights and services and on how to advocate for protecting their rights when needed.
                <br />
                The Alliance sees the need to intenstively work with the general society to ensure that the issues of women with disabilities are taken into consideration at different levels.
                <br />
                The guiding document for the organization for protecting the rights of women with disabilities are UNCRPD and CEDAW.
                <br />
                The target groups mainly are women with physical, sensory, and intellectual type of disabilities.

            </p>
        </div>
    )
}

export default TeamSingle