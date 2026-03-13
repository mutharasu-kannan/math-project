import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HistoryItem {
  type: string;
  operation?: string;
  input: string;
  result: string;
  timestamp: string;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('mathGalaxyUserName');
    const id = localStorage.getItem('mathGalaxyUserId');
    
    if (!name || !id) {
      navigate('/login');
      return;
    }

    setUserName(name);
    setUserId(id);

    const saved = localStorage.getItem('mathGalaxyHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, [navigate]);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.setItem('mathGalaxyHistory', '[]');
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Galaxy background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-[#1a1a4a] to-background opacity-80" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-primary/30 backdrop-blur-md bg-background/50">
          <div className="max-w-[120rem] mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
                <span className="font-paragraph">Back to Dashboard</span>
              </button>
              
              <div className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Calculation History
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-[120rem] mx-auto">
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 rounded-3xl bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow"
            >
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">User Information</h2>
              <p className="font-paragraph text-foreground/80">Name: {userName}</p>
              <p className="font-paragraph text-foreground/80">ID: {userId}</p>
            </motion.div>

            {/* Clear History Button */}
            {history.length > 0 && (
              <div className="mb-6 flex justify-end">
                <Button
                  onClick={clearHistory}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All History
                </Button>
              </div>
            )}

            {/* History List */}
            <div className="space-y-4">
              {history.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-xl font-paragraph text-foreground/60">
                    No calculation history yet. Start using calculators to see your history here.
                  </p>
                </motion.div>
              ) : (
                history.slice().reverse().map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-3xl bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-heading font-bold text-primary">
                          {item.type}
                        </h3>
                        {item.operation && (
                          <p className="text-sm font-paragraph text-foreground/60">
                            Operation: {item.operation}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-paragraph">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-paragraph text-foreground/80 text-sm">Input: </span>
                        <span className="font-paragraph text-foreground">{item.input}</span>
                      </div>
                      <div>
                        <span className="font-paragraph text-foreground/80 text-sm">Result: </span>
                        <span className="font-paragraph text-secondary font-semibold">{item.result}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
