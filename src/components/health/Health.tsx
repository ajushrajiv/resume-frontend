import { healthCheck } from '@/api/v1/health/HealthQueries';
import { useEffect, useState } from 'react';

const Health = () => {
  const [statusCode, setStatusCode] = useState<number | null>(null); 

  const checkHealth = async () => {
    try {
      const code = await healthCheck(); 
      setStatusCode(code); 
    } catch (error) {
      console.error('Error during health check:', error);
      setStatusCode(null); 
    }
  };

  useEffect(() => {
    checkHealth(); 
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Health;
