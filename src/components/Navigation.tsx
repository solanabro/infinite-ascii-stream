import { Twitter } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-4 left-0 w-full">
      <div className="container mx-auto px-6">
        <div className="terminal-header rounded-lg py-2 md:py-3 px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="text-white/80 text-sm md:text-base font-medium hover:text-white transition-colors glow">
              2.5.7
            </div>
            <a
              href="https://x.com/agentnevera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors p-1.5 md:p-2 rounded-md hover:bg-white/5"
            >
              <img 
                src="/lovable-uploads/30285e69-373b-414c-8a15-45365a552cff.png" 
                alt="X (Twitter) Logo" 
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;