import React from 'react';

const ServerLoader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center text-white px-4">
      {/* Tailwind Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600 mb-6"></div>
      
      <h2 className="text-2xl font-bold tracking-wide text-center uppercase italic mb-2">
        Waking up Food Spot...
      </h2>
      <p className="text-gray-400 text-sm text-center max-w-sm">
        We use free cloud hosting. The backend takes about 30–60 seconds to spin up on the first load. Thank you for your patience!
      </p>
    </div>
  );
};

export default ServerLoader;