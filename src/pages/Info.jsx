import React, { useEffect, useState, useMemo } from 'react';
import { useApiStore } from '../store/apiStore';
import TSSText from '../components/TSSText';

const Info = () => {
  const { loading, about, fetchAbout } = useApiStore();

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return (
    <div className='p-6 w-full'>
      <h1 className='font-bold mb-4'>Information</h1>
      <TSSText html content={about?.content} />
    </div>
  );
};

export default Info;
