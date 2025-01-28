import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './terminal/TerminalHeader';
import EmailForm from './terminal/EmailForm';
import { messages } from '../utils/terminalMessages';

const Terminal = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [status, setStatus] = useState('AWAITING INPUT');

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailSubmitted(true);
      setIsFirstVisit(false);
      setStatus('INITIALIZING');
    }
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      localStorage.setItem('userEmail', email);
      setIsEmailSubmitted(true);
      setStatus('PROCESSING DATA');
    }
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isEmailSubmitted) return;

    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }

    if (!isFirstVisit) {
      setStatus('INITIALIZING');
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

    if (messageIndex < messages.length) {
      let currentMessage = messages[messageIndex];
      let charIndex = 0;

      const typeCharacter = () => {
        if (charIndex < currentMessage.length) {
          setCurrentText(currentMessage.slice(0, charIndex + 1));
          charIndex++;
          const randomDelay = Math.random() * 20 + 15;
          setTimeout(typeCharacter, randomDelay);
        } else {
          setTimeout(() => {
            if (messageIndex === messages.length - 1) {
              setStatus('INITIALIZING');
            } else if (messageIndex > messages.length * 0.7) {
              setStatus('PROCESSING DATA');
            }
            setMessageIndex(prev => prev + 1);
            setCurrentText('');
          }, 300);
        }
      };

      typeCharacter();
    } else {
      setStatus('INITIALIZING');
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
  }, [messageIndex, isEmailSubmitted, isFirstVisit]);

  if (!isEmailSubmitted) {
    return (
      <div className="relative space-y-2 sm:space-y-4 mb-8">
        <TerminalHeader status={status} messageIndex={messageIndex} />
        <div className="terminal-body p-4 sm:p-6 border border-white/5 rounded-lg">
          <EmailForm 
            email={email}
            setEmail={setEmail}
            handleEmailSubmit={handleEmailSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <TerminalHeader status={status} messageIndex={messageIndex} />
      <div ref={terminalRef} className="terminal-body overflow-y-auto h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] p-4 sm:p-6 border border-white/5 rounded-lg">
        <div className="text-left">
          {messages.slice(0, messageIndex).map((message, index) => (
            <div key={index} className="text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap min-h-[1.5em]">
              {message}
              {message !== '' && <div className="h-2"></div>}
            </div>
          ))}
          {messageIndex < messages.length && (
            <div className="text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap min-h-[1.5em]">
              {currentText}
              {showCursor && (
                <span className="inline-block w-2 h-4 bg-white/90 ml-1"></span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;