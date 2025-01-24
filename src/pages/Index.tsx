import { useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Terminal from '../components/Terminal';
import { EmailDialog } from '../components/EmailDialog';

const Index = () => {
  const [showTerminal, setShowTerminal] = useState(false);

  const handleEmailSubmit = (email: string) => {
    setShowTerminal(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <EmailDialog onEmailSubmit={handleEmailSubmit} />
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <div className="mb-8">
          <Logo />
        </div>
        {showTerminal && <Terminal />}
      </div>
      <Navigation />
    </div>
  );
};

export default Index;