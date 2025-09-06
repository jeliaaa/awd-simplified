import React, { useEffect, useState, useMemo } from 'react';
import { useApiStore } from '../store/apiStore';
import TTSText from '../components/TTSText';
import { useTranslation } from 'react-i18next';

const Info = () => {
  const { loading, about, fetchAbout } = useApiStore();
  const { t } = useTranslation()

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return (
    <div className='p-6 w-full'>
      <h1 className='font-bold mb-4'>{t("information")}</h1>
      <TTSText html content={about?.content} />
    </div>
  );
};

export default Info;
