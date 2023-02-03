import { useState, useEffect } from 'react';

export default function Time() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  if (!mounted) return null;

  return (
    <p className='tabular-nums'>
      {time.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </p>
  );
}
