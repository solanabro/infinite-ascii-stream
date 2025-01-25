import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Terminal from '../components/Terminal';

const Index = () => {
  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen max-w-[1400px]">
        <div className="mb-8 w-full max-w-full overflow-x-hidden">
          <Logo />
        </div>
        <Terminal />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;