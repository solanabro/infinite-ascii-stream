import { Twitter } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-white/20 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-white/60 text-sm">NEVERA Terminal v1.0.0</div>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
        >
          <Twitter className="w-5 h-5 stroke-[1.5]" />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;