import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState('');
  const [people, setPeople] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const budget = parseFloat(totalBudget);
    const numPeople = parseInt(people);
    const perPerson = budget / numPeople;
    
    const res = `Budget per person: $${perPerson.toFixed(2)}`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Budget Calculator',
      input: `$${budget} for ${numPeople} people`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Household Budget per Person</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Total Budget ($)</Label>
          <Input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Number of People</Label>
          <Input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Calculate
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-secondary/30">
            <p className="font-heading text-xl font-bold text-secondary">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
