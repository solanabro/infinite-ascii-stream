import { format } from 'date-fns';

interface TerminalHeaderProps {
  status: string;
  messageIndex: number;
}

const TerminalHeader = ({ status, messageIndex }: TerminalHeaderProps) => {
  const statusColors = {
    'ACTIVE': 'bg-green-500',
    'SCANNING': 'bg-blue-500',
    'PROCESSING DATA': status === 'PROCESSING DATA' && messageIndex < 10 
      ? 'bg-yellow-500' 
      : 'bg-purple-500',
    'INITIALIZING': 'bg-blue-500',
    'ANALYZING': 'bg-purple-500'
  };

  return (
    <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
        <span className="text-white/80 font-mono text-xs sm:text-sm glow">STATUS: {status}</span>
      </div>
      <div className="text-white/80 font-mono text-xs sm:text-sm glow">
        {format(new Date(), 'HH:mm:ss')}
      </div>
    </div>
  );
};

export default TerminalHeader;