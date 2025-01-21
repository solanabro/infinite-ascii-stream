import React from 'react';
import { format } from 'date-fns';

interface TimeDisplayProps {
  currentTime: Date;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ currentTime }) => {
  return (
    <div className="absolute bottom-4 right-4 text-white/80 font-mono text-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-md">
      {format(currentTime, 'HH:mm:ss')}
    </div>
  );
};