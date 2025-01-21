import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Terminal from '../components/Terminal';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col min-h-screen pb-16">
        <div className="mb-4 sm:mb-8">
          <Logo />
        </div>
        <Terminal />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;