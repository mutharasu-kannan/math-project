import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Galaxy background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-[#1a1a4a] to-background opacity-80" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
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
                About Math Galaxy
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-[100rem] mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-8"
              >
                <Rocket className="w-24 h-24 text-primary mx-auto" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-gradient-start mb-6">
                Welcome to Math Galaxy
              </h1>
            </motion.div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-3xl bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Lightbulb className="w-12 h-12 text-primary" />
                  <h2 className="text-2xl font-heading font-bold text-foreground">What We Do</h2>
                </div>
                <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                  Math Galaxy is a futuristic calculator platform designed to help students and engineers solve real-world problems using mathematics.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-3xl bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Target className="w-12 h-12 text-secondary" />
                  <h2 className="text-2xl font-heading font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                  Our mission is to make mathematics powerful, practical, and accessible.
                </p>
              </motion.div>
            </div>

            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-gradient-start/20 backdrop-blur-xl border-2 border-primary/50 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Our Vision
              </h2>
              <p className="font-paragraph text-xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                "Our vision is to build tools that transform mathematics into a practical problem-solving companion for everyday life."
              </p>
            </motion.div>

            {/* Motto Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="inline-block p-8 rounded-3xl bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow">
                <p className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-gradient-start">
                  "Work with will. Study with will."
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
