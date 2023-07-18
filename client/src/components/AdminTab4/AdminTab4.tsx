import { useState, useEffect } from 'react';

import ClientCard from './ClientCard';

const AdminTab4 = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const response: Response = await fetch(
          import.meta.env.VITE_URL + 'user/all',
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const result = await response.json();
          setClients(result);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {clients.map((client) => (
        <ClientCard key={`client${client.id}`} client={client} />
      ))}
    </>
  );
};

export default AdminTab4;
