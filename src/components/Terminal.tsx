import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
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

  const generateTransactionDisplay = (signature: string, slot: number) => {
    return `async function processTransaction_${slot}() {
    const tx = "${signature.substring(0, 20)}...";
    console.log("[TRANSACTION DETECTED]");
    await validateBlock({
        signature: tx,
        slot: ${slot},
        timestamp: ${Date.now()},
        status: "CONFIRMED"
    });
    return { status: "PROCESSED" };
}`;
  };

  const generateNewsDisplay = (news: NewsItem) => {
    return `function analyzeMarketEvent() {
    console.log("[MARKET INTELLIGENCE]");
    const event = {
        title: "${news.title.replace(/"/g, '\\"')}",
        timestamp: ${news.timestamp},
        source: "ENCRYPTED_FEED_α"
    };
    processIntelligence(event);
    return { priority: "HIGH" };
}`;
  };

  const generateSystemMessage = () => {
    const messages = [
      `function initializeProtocol() {
    console.log("[ SYSTEM STATUS: OPTIMAL ]");
    const modules = ["Transaction Scanner", "Intelligence Parser"];
    return { status: "ACTIVE", uptime: "${Math.floor(Math.random() * 1000)}h" };
}`,
      `async function validateNetwork() {
    console.log(":: NETWORK SCAN COMPLETE ::");
    const health = {
        latency: "${Math.floor(Math.random() * 50)}ms",
        nodes: ${Math.floor(Math.random() * 1000)},
        status: "SECURE"
    };
    return health;
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
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    let mounted = true;

    const fetchTransactions = async () => {
      try {
        // Monitor a popular Solana program (e.g., Serum DEX)
        const programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
        const signatures = await connection.getSignaturesForAddress(programId, { limit: 1 });

        if (signatures.length > 0 && signatures[0].signature !== lastSignature && mounted) {
          setLastSignature(signatures[0].signature);
          const newCode = generateTransactionDisplay(signatures[0].signature, signatures[0].slot);
          setDisplayedCode(prev => {
            const newArray = [...prev, newCode];
            return newArray.slice(-50); // Keep last 50 lines
          });
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchNews = async () => {
      try {
        // Note: Replace with actual crypto news API in production
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
        // If news API fails, generate system message instead
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
          <span className="text-white/80 font-mono text-xs sm:text-sm glow">STATUS: {status}</span>
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