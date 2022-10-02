import React from 'react';

export default function Time() {
  const [mounted, setMounted] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    setMounted(true);
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {time.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </div>
  );
}
