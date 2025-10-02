import React, { useEffect, useState } from 'react';
import { Launch, fetchLatestLaunch } from '../service/spaceXService';

const ModeloSpaceX: React.FC = () => {
  const [launch, setLaunch] = useState<Launch | null>(null);

  useEffect(() => {
    const getLaunch = async () => {
      const data = await fetchLatestLaunch();
      setLaunch(data);
    };
    getLaunch();
  }, []);

  return (
    <div>
      {launch ? (
        <div>
          <p>Fecha: {new Date(launch.date_utc).toLocaleString()}</p>
          {launch.details && <p>{launch.details}</p>}
          {launch.links.patch.small && (
            <img src={launch.links.patch.small} alt={launch.name} />
          )}
          {launch.links.webcast && (
            <p>
              <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
                Ver video
              </a>
            </p>
          )}
        </div>
      ) : (
        <p>Cargando lanzamiento…</p>
      )}
    </div>
  );
};

export default ModeloSpaceX;
