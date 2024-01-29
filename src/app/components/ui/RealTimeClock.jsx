'use client'

import { useState, useEffect } from 'react'

const RealTimeClock = () => {
  const [realTime, setRealTime] = useState(new Date());

  useEffect(() => {
    const updateClock = () => {
      setRealTime(new Date());
    }

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, [])

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timeWithoutSeconds = realTime.toLocaleTimeString([], { timeZone: userTimezone, hour12: true, hour: 'numeric', minute: '2-digit' });

  return (
    <div>
      <p className="fixed z-10 top-0 left-0 text-white text-sm xl:text-3xl xl:py-3 xl:pr-6 xl:pl-4 xl:rounded-r-lg bg-gray-900/30 rounded-r-full py-1 pl-1 pr-2">{timeWithoutSeconds}</p>
      <p></p>
    </div>
  )
}

export default RealTimeClock