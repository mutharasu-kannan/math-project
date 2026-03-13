import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CollegeExpenseCalculator() {
  const [tuition, setTuition] = useState('');
  const [books, setBooks] = useState('');
  const [housing, setHousing] = useState('');
  const [food, setFood] = useState('');
  const [transport, setTransport] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const total = 
      parseFloat(tuition || '0') +
      parseFloat(books || '0') +
      parseFloat(housing || '0') +
      parseFloat(food || '0') +
      parseFloat(transport || '0');
    
    const res = `Total College Expenses: $${total.toFixed(2)}`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'College Expense',
      input: 'Multiple categories',
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">College Expense Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Tuition Fees ($)</Label>
          <Input
            type="number"
            value={tuition}
            onChange={(e) => setTuition(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Books & Supplies ($)</Label>
          <Input
            type="number"
            value={books}
            onChange={(e) => setBooks(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Housing ($)</Label>
          <Input
            type="number"
            value={housing}
            onChange={(e) => setHousing(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Food ($)</Label>
          <Input
            type="number"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Transportation ($)</Label>
          <Input
            type="number"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-accent-gradient-end text-primary-foreground hover:bg-accent-gradient-end/90"
        >
          Calculate Total
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-accent-gradient-end/30">
            <p className="font-heading text-2xl font-bold text-accent-gradient-end">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
