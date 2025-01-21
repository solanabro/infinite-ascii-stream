import { Twitter } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-white/20 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-white/60 text-sm">ca: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpump</div>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">v2.1.4</span>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;