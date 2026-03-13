import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Grid3x3, TrendingUp, Activity, Sigma, Zap, Binary, Atom } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import BasicCalculator from '@/components/calculators/BasicCalculator';
import MatrixCalculator from '@/components/calculators/MatrixCalculator';
import EigenCalculator from '@/components/calculators/EigenCalculator';
import EquationSolver from '@/components/calculators/EquationSolver';
import CalculusSolver from '@/components/calculators/CalculusSolver';
import LaplaceCalculator from '@/components/calculators/LaplaceCalculator';
import VectorCalculator from '@/components/calculators/VectorCalculator';
import ComplexConverter from '@/components/calculators/ComplexConverter';
import ProbabilityCalculator from '@/components/calculators/ProbabilityCalculator';
import PrimeChecker from '@/components/calculators/PrimeChecker';
import UnitConverter from '@/components/calculators/UnitConverter';
import CauchyRiemannChecker from '@/components/calculators/CauchyRiemannChecker';

export default function EngineeringPage() {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(true);
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem('mathGalaxyUserName');
    if (!userName) {
      navigate('/login');
    }
  }, [navigate]);

  const calculators = [
    { id: 'basic', title: 'Basic Calculator', icon: Calculator, component: BasicCalculator },
    { id: 'matrix', title: 'Matrix Calculator', icon: Grid3x3, component: MatrixCalculator },
    { id: 'eigen', title: 'Eigenvalues & Eigenvectors', icon: TrendingUp, component: EigenCalculator },
    { id: 'cauchy', title: 'Cauchy-Riemann Checker', icon: Activity, component: CauchyRiemannChecker },
    { id: 'equation', title: 'Equation Solver', icon: Sigma, component: EquationSolver },
    { id: 'calculus', title: 'Calculus Solver', icon: Zap, component: CalculusSolver },
    { id: 'laplace', title: 'Laplace Transform', icon: Binary, component: LaplaceCalculator },
    { id: 'vector', title: 'Vector Calculator', icon: Atom, component: VectorCalculator },
    { id: 'complex', title: 'Complex Number Converter', icon: Binary, component: ComplexConverter },
    { id: 'probability', title: 'Probability Calculator', icon: TrendingUp, component: ProbabilityCalculator },
    { id: 'prime', title: 'Prime Number Checker', icon: Calculator, component: PrimeChecker },
    { id: 'unit', title: 'Unit Converter', icon: Zap, component: UnitConverter },
  ];

  const SelectedComponent = calculators.find(c => c.id === selectedCalculator)?.component;

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
                Engineering Calculators
              </div>
            </div>
          </div>
        </header>

        {/* Warning Dialog */}
        <Dialog open={showWarning} onOpenChange={setShowWarning}>
          <DialogContent className="bg-background border-2 border-primary/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-foreground">Important Notice</DialogTitle>
              <DialogDescription className="text-foreground/80 font-paragraph text-base space-y-4 pt-4">
                <p>
                  Calculator is a device that can solve anything, but using your own knowledge is always better.
                </p>
                <p className="text-destructive font-semibold">
                  Notice: Do NOT use this calculator during exams.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Calculator Grid */}
        <section className="py-16 px-6">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {calculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <motion.div
                    key={calc.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => setSelectedCalculator(calc.id)}
                    className="cursor-pointer group"
                  >
                    <div className="relative h-48 rounded-3xl overflow-hidden">
                      {/* Glassmorphism background */}
                      <div className="absolute inset-0 bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow" />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-primary/10 blur-xl" />
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <Icon className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {calc.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Calculator Modal */}
        <Dialog open={!!selectedCalculator} onOpenChange={() => setSelectedCalculator(null)}>
          <DialogContent className="bg-background border-2 border-primary/50 max-w-4xl max-h-[90vh] overflow-y-auto">
            {SelectedComponent && <SelectedComponent />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
