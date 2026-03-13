// HPI 1.7-G
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, GraduationCap, ChevronRight, Sparkles, Activity, Orbit } from 'lucide-react';

// --- Canonical Data Sources ---
const QUOTES = [
  "Mathematics is the language of the universe.",
  "Every problem has a solution.",
  "Numbers never lie, they reveal the truth.",
  "In mathematics, you don't understand things. You just get used to them.",
  "Mathematics is the music of reason."
];

const CATEGORIES = [
  {
    id: 'engineering',
    title: 'Engineering Calculator',
    description: 'Advanced mathematical tools for engineering students. Solve complex equations, matrices, and calculus with step-by-step precision.',
    icon: Calculator,
    gradient: 'from-primary via-secondary to-accent-gradient-start',
    path: '/engineering'
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Calculator',
    description: 'Practical tools for everyday life management. Track expenses, convert currencies globally, and monitor your daily habits.',
    icon: TrendingUp,
    gradient: 'from-secondary via-accent-gradient-start to-accent-gradient-end',
    path: '/lifestyle'
  },
  {
    id: 'student',
    title: 'Student Calculator',
    description: 'Academic performance tracking and planning. Calculate GPA, manage study progress, and plan your revision effectively.',
    icon: GraduationCap,
    gradient: 'from-accent-gradient-end via-primary to-secondary',
    path: '/student'
  }
];
// ------------------------------

const ParticleField = ({ count = 50, speed = 1, opacity = 0.5, size = "w-1 h-1" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${size} bg-primary rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * opacity,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, opacity, 0],
            scale: [0, Math.random() * 2 + 1, 0],
          }}
          transition={{
            duration: (Math.random() * 5 + 5) / speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('mathGalaxyUserName');
    if (!storedName) {
      navigate('/login');
    } else {
      setUserName(storedName);
    }

    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 3000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => {
      clearInterval(quoteInterval);
      clearTimeout(loadingTimer);
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-clip">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a4a] via-background to-background" />
        
        <ParticleField count={100} speed={0.5} opacity={0.8} size="w-1.5 h-1.5" />
        <ParticleField count={50} speed={1.5} opacity={0.4} size="w-2 h-2" />

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-[120rem] mx-auto">
          {/* Orbital Loader */}
          <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary opacity-50"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-b-2 border-r-2 border-secondary opacity-50"
            />
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Orbit className="w-12 h-12 text-accent-gradient-start" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-gradient-start mb-4">
              MATH GALAXY
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50" />
          </motion.div>

          <div className="h-24 flex items-center justify-center w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-2xl font-paragraph text-foreground/80 italic text-center font-light tracking-wide"
              >
                "{QUOTES[quoteIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  if (!userName) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground overflow-clip font-paragraph">
      {/* --- Global Cosmic Canvas --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a4a_0%,_transparent_70%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_#2a1a4a_0%,_transparent_50%)] opacity-40" />
        <ParticleField count={150} speed={0.2} opacity={0.3} />
      </div>

      {/* --- Navigation Header --- */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/40 backdrop-blur-2xl">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:border-primary transition-colors">
              <Orbit className="w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <span className="text-2xl font-heading font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-primary group-hover:to-secondary transition-all">
              MATH GALAXY
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Dashboard', href: '#dashboard' },
              { label: 'History', href: '/history' },
              { label: 'About', href: '/about' },
              { label: 'Our Team', href: '/team' }
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium tracking-widest uppercase text-foreground/60 hover:text-primary transition-colors relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
              className="px-6 py-2.5 rounded-full border border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all text-sm font-medium tracking-widest uppercase"
            >
              Disconnect
            </motion.button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-24">
        {/* --- Hero Section --- */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="w-[800px] h-[800px] rounded-full border border-primary/5 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
              className="absolute w-[1200px] h-[1200px] rounded-full border border-secondary/5 border-dotted"
            />
          </div>

          <div className="max-w-[120rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium tracking-widest uppercase text-primary">System Online</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[1.1] tracking-tight mb-6"
              >
                Welcome back,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-gradient-start">
                  {userName}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-xl md:text-2xl text-foreground/60 font-light max-w-2xl leading-relaxed mb-12"
              >
                Your personal command center for advanced mathematics, lifestyle tracking, and academic excellence. All systems are primed and ready.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-6"
              >
                <a 
                  href="#dashboard"
                  className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium tracking-wide overflow-hidden flex items-center gap-3"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10">Access Terminals</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="flex items-center gap-4 text-sm text-foreground/50 font-medium tracking-widest uppercase">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span>Live Sync Active</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">Scroll to initialize</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </section>

        {/* --- Dashboard Section --- */}
        <section id="dashboard" className="py-32 px-6 lg:px-12 relative">
          <div className="max-w-[120rem] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                  Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Modules</span>
                </h2>
                <p className="text-lg text-foreground/60 max-w-xl font-light">
                  Select a specialized terminal to begin your calculations. Each module is equipped with advanced processing capabilities.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex items-center gap-4"
              >
                <div className="h-[1px] w-32 bg-primary/30" />
                <span className="text-xs tracking-[0.3em] uppercase text-primary/70">Select Module</span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              {CATEGORIES.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: index * 0.2 }}
                    className="group relative"
                  >
                    {/* Ambient Glow Layer (Replaces box-shadow) */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-gradient-start/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Main Card Container - Curved Futuristic Shape */}
                    <div 
                      onClick={() => navigate(category.path)}
                      className="relative h-[500px] cursor-pointer flex flex-col justify-between p-10 overflow-hidden bg-card-glass-overlay backdrop-blur-xl border border-primary/20 group-hover:border-primary/50 transition-colors duration-500"
                      style={{
                        borderTopLeftRadius: '4rem',
                        borderBottomRightRadius: '4rem',
                        borderTopRightRadius: '1rem',
                        borderBottomLeftRadius: '1rem',
                      }}
                    >
                      {/* Internal Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`} />
                      
                      {/* Top Section: Icon & Title */}
                      <div className="relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-background/50 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                          <Icon className="w-10 h-10 text-primary group-hover:text-secondary transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-heading font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                          {category.title}
                        </h3>
                        <p className="text-foreground/60 leading-relaxed font-light">
                          {category.description}
                        </p>
                      </div>

                      {/* Bottom Section: Action */}
                      <div className="relative z-10 flex items-center justify-between mt-8 pt-8 border-t border-primary/10">
                        <span className="text-sm font-medium tracking-widest uppercase text-primary/70 group-hover:text-primary transition-colors">
                          Initialize
                        </span>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                          <ChevronRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>

                      {/* Decorative Tech Lines */}
                      <div className="absolute top-0 right-10 w-[1px] h-24 bg-gradient-to-b from-primary/30 to-transparent" />
                      <div className="absolute bottom-10 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent to-primary/30" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- Data Visualization / Decorative Section --- */}
        <section className="py-24 px-6 lg:px-12 border-t border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3NywgNzcsIDI1NSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
          
          <div className="max-w-[120rem] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h3 className="text-2xl md:text-4xl font-heading font-bold mb-4">Precision in Every Calculation</h3>
              <p className="text-foreground/60 font-light max-w-2xl">
                Math Galaxy utilizes advanced algorithms to ensure absolute accuracy across all modules. Your data is processed locally for maximum speed and privacy.
              </p>
            </div>
            <div className="flex gap-8">
              {[
                { label: "Uptime", value: "99.9%" },
                { label: "Latency", value: "<10ms" },
                { label: "Accuracy", value: "100%" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center md:items-start">
                  <span className="text-3xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20">
                    {stat.value}
                  </span>
                  <span className="text-xs tracking-widest uppercase text-primary mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="relative z-10 border-t border-primary/20 bg-background pt-20 pb-10 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center mb-8">
            <Orbit className="w-8 h-8 text-primary/50" />
          </div>
          
          <h4 className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
            "Work with will. Study with will."
          </h4>
          
          <p className="text-foreground/40 font-light max-w-md mb-12">
            Math Galaxy is a futuristic calculator platform designed to help students and engineers solve real-world problems using mathematics.
          </p>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full text-sm text-foreground/40 font-light">
            <p>© 2026 Math Galaxy. All systems operational.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/about" className="hover:text-primary transition-colors">About Us</a>
              <a href="/team" className="hover:text-primary transition-colors">ECE Warriors</a>
              <a href="/history" className="hover:text-primary transition-colors">Data Logs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
