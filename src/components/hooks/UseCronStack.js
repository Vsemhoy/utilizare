import { useEffect } from 'react';

export const useCronStack = (requests, intervalMinutes) => {
  useEffect(() => {
    if (!requests || !Array.isArray(requests) || intervalMinutes <= 0) return;

    const id = setInterval(() => {
      requests.forEach(req => {
        fetch(req.url, {
          method: req.method,
          headers: { 'Content-Type': 'application/json' },
          body: req.body ? JSON.stringify(req.body) : undefined,
        })
          .then(res => res.json())
          .then(data => console.log('Response:', data))
          .catch(err => console.error('Error:', err));
      });
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(id);
  }, [requests, intervalMinutes]);
};