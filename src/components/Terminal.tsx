import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';

interface NewsItem {
  title: string;
  url: string;
  timestamp: number;
}

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [displayedCode, setDisplayedCode] = useState<string[]>(['']);
  const [currentTime, setCurrentTime] = useState(new Date());
  const status = 'ACTIVE';
  const [lastSignature, setLastSignature] = useState<string | null>(null);

  const statusColors = {
    ACTIVE: 'bg-green-500',
    SCANNING: 'bg-blue-500',
    PROCESSING: 'bg-yellow-500',
    ANALYZING: 'bg-purple-500'
  };

  const cryptoSlang = [
    "HODL", "To The Moon!", "Diamond Hands", "Paper Hands", "Wen Lambo?",
    "WAGMI", "NGMI", "Ser", "Probably Nothing", "gm", "Ape In",
    "Degen", "Rekt", "Based", "Bearish", "Bullish", "Cope"
  ];

  const generateTransactionDisplay = (signature: string, slot: number) => {
    const slang = cryptoSlang[Math.floor(Math.random() * cryptoSlang.length)];
    return `async function cryptoTrenches_${slot}() {
    console.log("[🕳️ DIVING INTO THE TRENCHES]");
    const tx = "${signature.substring(0, 20)}...";
    await analyzeBlockchain({
        status: "${slang}",
        trenchDepth: ${Math.floor(Math.random() * 1000)},
        radioactivity: "HIGH",
        signature: tx,
        slot: ${slot},
        timestamp: ${Date.now()},
    });
    return { mood: "RETARDIO_ACTIVATED" };
}`;
  };

  const generateNewsDisplay = (news: NewsItem) => {
    const slang = cryptoSlang[Math.floor(Math.random() * cryptoSlang.length)];
    return `function decodeMarketSignals() {
    console.log("[🧠 NEURAL NETWORK ACTIVATED]");
    const intel = {
        title: "${news.title.replace(/"/g, '\\"')}",
        timestamp: ${news.timestamp},
        source: "CRYPTO_MATRIX_${Math.floor(Math.random() * 100)}",
        sentiment: "${slang}",
        trustLevel: "${Math.random() > 0.5 ? 'TRUST ME BRO' : 'SOURCE: VOICES IN MY HEAD'}"
    };
    return { vibeCheck: "IMMACULATE" };
}`;
  };

  const generateSystemMessage = () => {
    const messages = [
      `function initializeRetardio() {
    console.log("[ 🤖 RETARDIO OS v${Math.random().toString().substring(0, 4)} ]");
    const brain = {
        status: "PROBABLY NOTHING",
        memeLevel: "OVER 9000",
        copium: "INFINITE",
        uptime: "${Math.floor(Math.random() * 1000)}h"
    };
    return { condition: "ULTRA BASED" };
}`,
      `async function scanCryptoTrenches() {
    console.log(":: 🕵️ TRENCH RECONNAISSANCE ::");
    const report = {
        degeneracy: "${Math.random() > 0.5 ? 'MAXIMUM' : 'ASTRONOMICAL'}",
        copiumLevels: "${Math.floor(Math.random() * 100)}%",
        hopium: "OVERDOSE",
        status: "SENDING IT"
    };
    return report;
}`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const connection = new Connection('https://api.devnet.solana.com');
    let mounted = true;

    const fetchTransactions = async () => {
      try {
        const programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
        const signatures = await connection.getSignaturesForAddress(programId, { limit: 1 });

        if (signatures.length > 0 && signatures[0].signature !== lastSignature && mounted) {
          setLastSignature(signatures[0].signature);
          const newCode = generateTransactionDisplay(signatures[0].signature, signatures[0].slot);
          setDisplayedCode(prev => {
            const newArray = [...prev, newCode];
            return newArray.slice(-50);
          });
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        if (mounted) {
          const newCode = generateSystemMessage();
          setDisplayedCode(prev => {
            const newArray = [...prev, newCode];
            return newArray.slice(-50);
          });
        }
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/news');
        if (response.data && response.data.length > 0 && mounted) {
          const newsItem = {
            title: response.data[0].title,
            url: response.data[0].url,
            timestamp: Date.now()
          };
          const newCode = generateNewsDisplay(newsItem);
          setDisplayedCode(prev => {
            const newArray = [...prev, newCode];
            return newArray.slice(-50);
          });
        }
      } catch (error) {
        if (mounted) {
          const newCode = generateSystemMessage();
          setDisplayedCode(prev => {
            const newArray = [...prev, newCode];
            return newArray.slice(-50);
          });
        }
      }
    };

    const transactionInterval = setInterval(fetchTransactions, 3000);
    const newsInterval = setInterval(fetchNews, 5000);
    const systemInterval = setInterval(() => {
      if (mounted) {
        const newCode = generateSystemMessage();
        setDisplayedCode(prev => {
          const newArray = [...prev, newCode];
          return newArray.slice(-50);
        });
      }
    }, 7000);

    return () => {
      mounted = false;
      clearInterval(transactionInterval);
      clearInterval(newsInterval);
      clearInterval(systemInterval);
    };
  }, [lastSignature]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedCode]);

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm glow">RETARDIO STATUS: {status}</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm glow">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      <div 
        ref={terminalRef} 
        className="terminal-body h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] overflow-y-auto overflow-x-hidden p-2 sm:p-4 border border-white/5 rounded-lg scrollbar-hide"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {displayedCode.map((code, index) => (
          <pre key={index} className="text-white/90 text-xs sm:text-sm font-mono mb-2 sm:mb-4 whitespace-pre hover:text-white/100 transition-colors">
            {code}
            {index === displayedCode.length - 1 && (
              <span className="animate-pulse inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-white/90 ml-1 glow">_</span>
            )}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
