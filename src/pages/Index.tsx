import CodeRain from '../components/CodeRain';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <CodeRain />
      <div className="content min-h-screen flex flex-col items-center justify-center px-4">
        <Logo />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;