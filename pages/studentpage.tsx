import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, TrendingUp, BookOpen, Calculator, Target, Calendar } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import MarksCalculator from '@/components/calculators/MarksCalculator';
import GPACalculator from '@/components/calculators/GPACalculator';
import CGPACalculator from '@/components/calculators/CGPACalculator';
import GPAConverter from '@/components/calculators/GPAConverter';
import StudyProgressTracker from '@/components/calculators/StudyProgressTracker';
import RevisionPlanner from '@/components/calculators/RevisionPlanner';
import CollegeExpenseCalculator from '@/components/calculators/CollegeExpenseCalculator';

export default function StudentPage() {
  const navigate = useNavigate();
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem('mathGalaxyUserName');
    if (!userName) {
      navigate('/login');
    }
  }, [navigate]);

  const calculators = [
    { id: 'marks', title: 'Marks Percentage', icon: Calculator, component: MarksCalculator },
    { id: 'gpa', title: 'GPA Calculator', icon: TrendingUp, component: GPACalculator },
    { id: 'cgpa', title: 'CGPA Calculator', icon: GraduationCap, component: CGPACalculator },
    { id: 'converter', title: 'GPA to Percentage', icon: TrendingUp, component: GPAConverter },
    { id: 'progress', title: 'Study Progress Tracker', icon: Target, component: StudyProgressTracker },
    { id: 'revision', title: 'Revision Planner', icon: Calendar, component: RevisionPlanner },
    { id: 'expense', title: 'College Expense', icon: BookOpen, component: CollegeExpenseCalculator },
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
            className="absolute w-2 h-2 bg-accent-gradient-end rounded-full opacity-30"
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
        <header className="border-b border-accent-gradient-end/30 backdrop-blur-md bg-background/50">
          <div className="max-w-[120rem] mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-foreground hover:text-accent-gradient-end transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
                <span className="font-paragraph">Back to Dashboard</span>
              </button>
              
              <div className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-gradient-end to-primary">
                Student Calculators
              </div>
            </div>
          </div>
        </header>

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
                      <div className="absolute inset-0 bg-card-glass-overlay backdrop-blur-xl border-2 border-card-border-glow" />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-gradient-end/10 to-primary/10 group-hover:from-accent-gradient-end/20 group-hover:to-primary/20 transition-all" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-accent-gradient-end/10 blur-xl" />
                      </div>
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <Icon className="w-12 h-12 text-accent-gradient-end mb-4" strokeWidth={1.5} />
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
          <DialogContent className="bg-background border-2 border-accent-gradient-end/50 max-w-4xl max-h-[90vh] overflow-y-auto">
            {SelectedComponent && <SelectedComponent />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
