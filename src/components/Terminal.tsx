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
    ACTIVE: 'bg-white',
    SCANNING: 'bg-white',
    PROCESSING: 'bg-white',
    ANALYZING: 'bg-white'
  };

  const generateTransactionDisplay = (signature: string, slot: number) => {
    return `async function monitorTransaction_${slot}() {
    const transaction = {
        signature: "${signature.substring(0, 20)}...",
        slot: ${slot},
        timestamp: ${Date.now()},
        status: "CONFIRMED"
    };
    await processTransaction(transaction);
}`;
  };

  const generateNewsDisplay = (news: NewsItem) => {
    return `async function processMarketIntel() {
    const data = {
        headline: "${news.title.replace(/"/g, '\\"')}",
        timestamp: ${news.timestamp},
        source: "NETWORK_${Math.floor(Math.random() * 100)}"
    };
    await analyzeMarketData(data);
}`;
  };

  const generateSystemMessage = () => {
    const messages = [
      `function initializeSystem() {
    const metrics = {
        uptime: "${Math.floor(Math.random() * 1000)}h",
        connections: ${Math.floor(Math.random() * 100)},
        latency: "${Math.floor(Math.random() * 100)}ms"
    };
    return metrics;
}`,
      `async function scanNetwork() {
    const status = {
        nodes: ${Math.floor(Math.random() * 1000)},
        blockHeight: ${Math.floor(Math.random() * 1000000)},
        tps: ${Math.floor(Math.random() * 100)}
    };
    return status;
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
    <div className="fixed inset-0 bg-black">
      <div className="absolute top-0 left-0 right-0 terminal-header p-2 sm:p-4 border-b border-white/10 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm glow">SYSTEM STATUS: {status}</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm glow">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      <div 
        ref={terminalRef} 
        className="fixed inset-0 pt-12 overflow-y-auto overflow-x-hidden font-mono text-white/90"
      >
        {displayedCode.map((code, index) => (
          <pre key={index} className="p-2 sm:p-4 text-xs sm:text-sm whitespace-pre hover:text-white transition-colors">
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
