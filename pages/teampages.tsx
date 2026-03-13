import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';

export default function TeamPage() {
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'MUTHARASU', role: 'Developer' },
    { name: 'MOKESH', role: 'Developer' },
    { name: 'IBHI', role: 'Developer' },
    { name: 'KAMITHA', role: 'Developer' },
    { name: 'MOHAMMED JUHAIL', role: 'Developer' },
    { name: 'MITHILESH KUMAR', role: 'Developer' },
    { name: 'DAMU', role: 'Developer' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Galaxy background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-[#1a1a4a] to-background opacity-80" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary rounded-full opacity-30"
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
        <header className="border-b border-secondary/30 backdrop-blur-md bg-background/50">
          <div className="max-w-[120rem] mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
                <span className="font-paragraph">Back to Dashboard</span>
              </button>
              
              <div className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent-gradient-start">
                Our Team
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-[120rem] mx-auto">
            {/* Team Name */}
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
                <Users className="w-24 h-24 text-secondary mx-auto" />
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent-gradient-start to-accent-gradient-end mb-4">
                ECE WARRIORS
              </h1>
              
              <p className="text-xl font-paragraph text-foreground/80">
                The brilliant minds behind Math Galaxy
              </p>
            </motion.div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div
                    className="relative h-80 rounded-[2.5rem] overflow-hidden"
                    style={{
                      clipPath: 'polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%)',
                    }}
                  >
                    {/* Glassmorphism background */}
                    <div className="absolute inset-0 bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow" />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent-gradient-start/20 to-accent-gradient-end/20 group-hover:from-secondary/30 group-hover:via-accent-gradient-start/30 group-hover:to-accent-gradient-end/30 transition-all" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-secondary/20 blur-2xl" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                      {/* Avatar placeholder */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary via-accent-gradient-start to-accent-gradient-end mb-6 flex items-center justify-center"
                      >
                        <span className="text-5xl font-heading font-bold text-primary-foreground">
                          {member.name.charAt(0)}
                        </span>
                      </motion.div>
                      
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {member.name}
                      </h3>
                      
                      <p className="font-paragraph text-secondary text-lg">
                        {member.role}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-6 w-16 h-1 bg-gradient-to-r from-secondary to-accent-gradient-start rounded-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Team Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="inline-block p-8 rounded-3xl bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow">
                <p className="text-xl md:text-2xl font-paragraph text-foreground/90 max-w-3xl">
                  Together, we're building the future of mathematical computing and making complex calculations accessible to everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
