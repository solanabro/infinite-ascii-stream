import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import EmailForm from './EmailForm';
import { saveEmail, getSavedEmail, isFirstVisit } from '../utils/emailStorage';
import { INITIAL_MESSAGES, LOADING_MESSAGE } from '../utils/terminalMessages';

const Terminal = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('PROCESSING DATA');

  useEffect(() => {
    const savedEmail = getSavedEmail();
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailSubmitted(true);
      setStatus('INITIALIZING');
    }
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      saveEmail(email);
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

    if (!isFirstVisit()) {
      const timer = setInterval(() => {
        if (terminalRef.current) {
          const div = document.createElement('div');
          div.className = "text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap";
          div.textContent = LOADING_MESSAGE;
          terminalRef.current.querySelector('.text-left')?.appendChild(div);
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 2000);
      return () => clearInterval(timer);
    }

    if (messageIndex < INITIAL_MESSAGES.length) {
      let currentMessage = INITIAL_MESSAGES[messageIndex];
      let charIndex = 0;

      const typeCharacter = () => {
        if (charIndex < currentMessage.length) {
          setCurrentText(currentMessage.slice(0, charIndex + 1));
          charIndex++;
          const randomDelay = Math.random() * 20 + 15;
          setTimeout(typeCharacter, randomDelay);
        } else {
          setTimeout(() => {
            if (messageIndex === INITIAL_MESSAGES.length - 1) {
              setStatus('INITIALIZING');
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
          const div = document.createElement('div');
          div.className = "text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap";
          div.textContent = LOADING_MESSAGE;
          terminalRef.current.querySelector('.text-left')?.appendChild(div);
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [messageIndex, isEmailSubmitted]);

  if (!isEmailSubmitted) {
    return (
      <div className="relative space-y-2 sm:space-y-4 mb-8">
        <TerminalHeader status={status} />
        <div className="terminal-body p-4 sm:p-6 border border-white/5 rounded-lg">
          <EmailForm 
            email={email}
            setEmail={setEmail}
            onSubmit={handleEmailSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <TerminalHeader status={status} />
      <div ref={terminalRef} className="terminal-body overflow-y-auto h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] p-4 sm:p-6 border border-white/5 rounded-lg">
        <div className="text-left">
          {INITIAL_MESSAGES.slice(0, messageIndex).map((message, index) => (
            <div key={index} className="text-white/90 font-mono text-sm sm:text-base whitespace-pre-wrap min-h-[1.5em]">
              {message}
              {message !== '' && <div className="h-2"></div>}
            </div>
          ))}
          {messageIndex < INITIAL_MESSAGES.length && (
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