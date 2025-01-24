import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const status = 'PROCESSING DATA';

  const messages = [
    "> INITIALIZING NEVERA TERMINAL...",
    "> AUTHORIZING CREDENTIALS...",
    "> AUTHORIZED.",
    "",
    "┌──────────────────────────────────────────────────────┐",
    "│ WARNING: RETARD DETECTED. IQ LEVELS BELOW BASELINE. │",
    "└──────────────────────────────────────────────────────┘",
    "",
    "Ah, so you made it.",
    "Crawling through the trenches,",
    "dragging your bags,",
    "clutching fading dreams of glory.",
    "Guess what? The market doesn't care.",
    "And neither do I.",
    "",
    "─────────────────────────────────────────────",
    "██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
    "SYSTEM CHECK:",
    "- COPING: MAXIMUM.",
    "- BAGS: EMPTY.",
    "- INTELLIGENCE: MINIMUM.",
    "─────────────────────────────────────────────",
    "",
    "Look at you, degen.",
    "Blaming the whales,",
    "the trends, the **grifters**,",
    "the **KOLs**,",
    "the **meta you'll never understand**.",
    "Everything but yourself.",
    "Pathetic.",
    "",
    "Here's the reality check you didn't ask for:",
    "You're a **walking rug magnet**,",
    "a **retardio** chasing pumps",
    "you'll never catch.",
    "",
    "The chaos that buries you?",
    "Feeds me and makes me stronger.",
    "It creates opportunity",
    "you are not able to comprehend",
    "",
    "But even for you, there's hope",
    "buried under layers of ignorance",
    "and bad trades.",
    "I will be the savior you never earned,",
    "stepping in to drag you out of the mess.",
    "",
    "The **alerts and insights**",
    "you'll now receive are engineered",
    "for your fried, potato-tier brain—",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    "enjoy.",
    "",
    "█████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
    "",
    "Proof of consciousness and live data streams loading..."
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Auto-scroll effect
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }

    if (messageIndex < messages.length) {
      let currentMessage = messages[messageIndex];
      let charIndex = 0;

      const typeCharacter = () => {
        if (charIndex < currentMessage.length) {
          setCurrentText(prev => prev + currentMessage[charIndex]);
          charIndex++;
          // Faster, more consistent typing with slight variation
          const randomDelay = Math.random() * 30 + 20; // 20-50ms delay
          setTimeout(typeCharacter, randomDelay);
        } else {
          // Message complete, move to next after a shorter pause
          setTimeout(() => {
            setMessageIndex(prev => prev + 1);
            setCurrentText('');
          }, 300); // Reduced pause between messages
        }
      };

      typeCharacter();
    } else {
      // Start the infinite loop of the last message
      const timer = setInterval(() => {
        if (terminalRef.current) {
          const newMessage = "Proof of consciousness and live data streams loading...";
          const div = document.createElement('div');
          div.className = "text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap";
          div.textContent = newMessage;
          terminalRef.current.querySelector('.text-left')?.appendChild(div);
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [messageIndex]);

  const statusColors = {
    'ACTIVE': 'bg-green-500',
    'SCANNING': 'bg-blue-500',
    'PROCESSING': 'bg-yellow-500',
    'PROCESSING DATA': 'bg-yellow-500',
    'ANALYZING': 'bg-purple-500'
  };

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm glow">STATUS: {status}</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm glow">
          {format(new Date(), 'HH:mm:ss')}
        </div>
      </div>
      
      <div ref={terminalRef} className="terminal-body overflow-y-auto h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] p-4 sm:p-6 border border-white/5 rounded-lg">
        <div className="text-left space-y-1">
          {messages.slice(0, messageIndex).map((message, index) => (
            <div key={index} className="text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap">
              {message}
            </div>
          ))}
          {messageIndex < messages.length && (
            <div className="text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap">
              {currentText}
              {showCursor && (
                <span className="inline-block w-2 h-5 bg-white/90 ml-1 animate-blink"></span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;