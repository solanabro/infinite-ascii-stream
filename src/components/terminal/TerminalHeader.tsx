import { format } from 'date-fns';

interface TerminalHeaderProps {
  status: string;
  messageIndex: number;
}

const TerminalHeader = ({ status, messageIndex }: TerminalHeaderProps) => {
  const getStatusColor = () => {
    if (status === 'AWAITING INPUT') {
      return 'bg-gray-500';
    } else if (status === 'PROCESSING DATA' && messageIndex < 10) {
      return 'bg-yellow-500';
    } else if (status === 'PROCESSING DATA') {
      return 'bg-purple-500';
    } else if (status === 'INITIALIZING') {
      return 'bg-blue-500';
    }
    return 'bg-green-500';
  };

  return (
    <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${getStatusColor()} animate-pulse status-glow`}></div>
        <span className="text-white/80 font-mono text-xs sm:text-sm glow">STATUS: {status}</span>
      </div>
      <div className="text-white/80 font-mono text-xs sm:text-sm glow">
        {format(new Date(), 'HH:mm:ss')}
      </div>
    </div>
  );
};

export default TerminalHeader;