import TTSText from '../components/TTSText';
import { useTranslation } from 'react-i18next';
import DefBtn from '../components/DefBtn';

const Projects = () => {
    const { t } = useTranslation()
    const years = [2025, 2024, 2023, 2022, 2021]

    
    return (
        <div className='p-6 w-full'>
            <h1 className='font-bold mb-4'>{t("information")}</h1>
            {years.map((y, _i) => (
                <DefBtn key={_i} className='text-center w-full p-5'>
                    <TTSText className='w-full' link={`${y}`} content={y.toString()} />
                </DefBtn>
            ))}
        </div>
    );
};

export default Projects;
