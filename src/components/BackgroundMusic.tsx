import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/lovable-uploads/your-audio-file.mp3'));

  useEffect(() => {
    audio.loop = true;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-white" />
        ) : (
          <VolumeX className="h-4 w-4 text-white" />
        )}
      </Button>
    </div>
  );
};

export default BackgroundMusic;