import React, { useState, useEffect } from 'react';

const ServerLoader = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only show the spinner if the loading state lasts longer than 1200ms
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null; // Invisible for the first 1.2 seconds!

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white px-4 transition-all duration-300">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-orange-600 mb-4"></div>
      <h2 className="text-xl font-bold tracking-wide text-center uppercase italic mb-1">
        Waking up our kitchen...
      </h2>
      <p className="text-gray-300 text-xs text-center max-w-xs">
        Connecting to the server. This takes a moment on the first visit.
      </p>
    </div>
  );
};

export default ServerLoader;