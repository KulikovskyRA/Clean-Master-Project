import React from 'react';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CleanerCard from './CleanerCard';

const AdminTab3 = () => {
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const resCleanerList: Response = await fetch(
          import.meta.env.VITE_URL + 'cleaner',
          {
            credentials: 'include',
          }
        );

        if (resCleanerList.ok) {
          const resultCL = await resCleanerList.json();
          // console.log(resultCL);
          setCleaners(resultCL);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {cleaners.map((cleaner) => (
        <CleanerCard key={`cleaner${cleaner.id}`} cleaner={cleaner} />
      ))}
    </>
  );
};

export default AdminTab3;
