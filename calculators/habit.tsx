import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Habit {
  name: string;
  count: number;
  dates: string[];
}

export default function HabitTracker() {
  const [habitName, setHabitName] = useState('');
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mathGalaxyHabits');
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  const addHabit = () => {
    if (!habitName.trim()) return;
    
    const existing = habits.find(h => h.name === habitName);
    if (existing) {
      const updated = habits.map(h => 
        h.name === habitName 
          ? { ...h, count: h.count + 1, dates: [...h.dates, new Date().toLocaleDateString()] }
          : h
      );
      setHabits(updated);
      localStorage.setItem('mathGalaxyHabits', JSON.stringify(updated));
    } else {
      const newHabit: Habit = {
        name: habitName,
        count: 1,
        dates: [new Date().toLocaleDateString()]
      };
      const updated = [...habits, newHabit];
      setHabits(updated);
      localStorage.setItem('mathGalaxyHabits', JSON.stringify(updated));
    }
    
    setHabitName('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Habit Tracker</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Habit Name</Label>
          <Input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            className="bg-background/50 border-secondary/30 text-foreground"
            placeholder="e.g., Morning Exercise"
          />
        </div>

        <Button
          onClick={addHabit}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Track Habit
        </Button>

        <div className="p-4 rounded-xl bg-card-glass-overlay border-2 border-secondary/30">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Your Habits</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {habits.map((habit, index) => (
              <div key={index} className="p-3 rounded-lg bg-background/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-heading text-foreground font-semibold">{habit.name}</span>
                  <span className="font-paragraph text-secondary font-bold">{habit.count} times</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-secondary to-accent-gradient-start"
                    style={{ width: `${Math.min(habit.count * 10, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {habits.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/20 border border-secondary">
              <p className="font-paragraph text-foreground/80 text-sm">Total Habits</p>
              <p className="font-heading text-3xl font-bold text-secondary">{habits.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/20 border border-primary">
              <p className="font-paragraph text-foreground/80 text-sm">Total Entries</p>
              <p className="font-heading text-3xl font-bold text-primary">
                {habits.reduce((sum, h) => sum + h.count, 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
