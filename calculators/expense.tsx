import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ExpenseTracker() {
  const [itemName, setItemName] = useState('');
  const [cost, setCost] = useState('');
  const [expenses, setExpenses] = useState<Array<{ name: string; cost: number; date: string }>>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mathGalaxyExpenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  const addExpense = () => {
    const newExpense = {
      name: itemName,
      cost: parseFloat(cost),
      date: new Date().toLocaleDateString()
    };

    const updated = [...expenses, newExpense];
    setExpenses(updated);
    localStorage.setItem('mathGalaxyExpenses', JSON.stringify(updated));

    // Compare with previous day
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    const todayTotal = updated.filter(e => e.date === today).reduce((sum, e) => sum + e.cost, 0);
    const yesterdayTotal = expenses.filter(e => e.date === yesterday).reduce((sum, e) => sum + e.cost, 0);

    if (todayTotal > yesterdayTotal) {
      setMessage('⚠️ Warning: Your spending increased compared to yesterday!');
    } else if (todayTotal < yesterdayTotal) {
      setMessage('🎉 Congratulations! Your spending decreased compared to yesterday!');
    } else {
      setMessage('Expense added successfully');
    }

    setItemName('');
    setCost('');

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Expense Tracker',
      input: `${itemName}: ${cost}`,
      result: 'Added',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  const total = expenses.reduce((sum, e) => sum + e.cost, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Daily Expense Tracker</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Item Name</Label>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
            placeholder="e.g., Groceries"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Cost</Label>
          <Input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
            placeholder="Enter cost"
          />
        </div>

        <Button
          onClick={addExpense}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Add Expense
        </Button>

        {message && (
          <div className={`p-4 rounded-xl border-2 ${message.includes('Warning') ? 'bg-destructive/20 border-destructive' : 'bg-secondary/20 border-secondary'}`}>
            <p className="font-paragraph text-foreground">{message}</p>
          </div>
        )}

        <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-secondary/30">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Recent Expenses</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {expenses.slice(-10).reverse().map((expense, index) => (
              <div key={index} className="flex justify-between text-foreground/90 font-paragraph text-sm">
                <span>{expense.name}</span>
                <span>${expense.cost.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-secondary/30">
            <p className="font-heading text-xl font-bold text-secondary">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
