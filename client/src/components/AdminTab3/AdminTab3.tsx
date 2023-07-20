import { useState, useEffect } from 'react';

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
