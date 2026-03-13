import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, User, Hash, Calendar, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    uniqueId: '',
    age: '',
    institution: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.uniqueId || !formData.age || !formData.institution) {
      alert('Please fill in all fields');
      return;
    }

    // Store user data in localStorage
    localStorage.setItem('mathGalaxyUserName', formData.name);
    localStorage.setItem('mathGalaxyUserId', formData.uniqueId);
    localStorage.setItem('mathGalaxyUserAge', formData.age);
    localStorage.setItem('mathGalaxyUserInstitution', formData.institution);

    // Navigate to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Galaxy background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-[#1a1a4a] to-background" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <Rocket className="w-20 h-20 text-primary mx-auto" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-gradient-start mb-4">
              MATH GALAXY
            </h1>
            
            <p className="text-lg md:text-xl font-paragraph text-foreground/80">
              Enter the universe of advanced calculations
            </p>
          </div>

          {/* Login Form Card */}
          <div
            className="relative rounded-[2rem] overflow-hidden"
            style={{
              clipPath: 'polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)',
            }}
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent-gradient-start/10" />

            {/* Form Content */}
            <div className="relative p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
                Access Portal
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-paragraph flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-primary/30 text-foreground font-paragraph focus:border-primary"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uniqueId" className="text-foreground font-paragraph flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary" />
                    Unique Number ID
                  </Label>
                  <Input
                    id="uniqueId"
                    type="text"
                    value={formData.uniqueId}
                    onChange={(e) => setFormData({ ...formData, uniqueId: e.target.value })}
                    className="bg-background/50 border-primary/30 text-foreground font-paragraph focus:border-primary"
                    placeholder="Enter your unique ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground font-paragraph flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-background/50 border-primary/30 text-foreground font-paragraph focus:border-primary"
                    placeholder="Enter your age"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-foreground font-paragraph flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Institution Name
                  </Label>
                  <Input
                    id="institution"
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="bg-background/50 border-primary/30 text-foreground font-paragraph focus:border-primary"
                    placeholder="Enter your institution"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-full bg-primary text-primary-foreground font-paragraph font-semibold text-lg shadow-[0_0_20px_rgba(77,77,255,0.6)] hover:shadow-[0_0_30px_rgba(77,77,255,0.8)] transition-all"
                >
                  Enter Math Galaxy
                </motion.button>
              </form>
            </div>
          </div>

          {/* Footer motto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="font-heading text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold">
              "Work with will. Study with will."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
