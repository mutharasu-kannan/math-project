import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ElectricityCalculator() {
  const [units, setUnits] = useState('');
  const [ratePerUnit, setRatePerUnit] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const u = parseFloat(units);
    const rate = parseFloat(ratePerUnit);
    const bill = u * rate;
    
    const res = `Total Bill: $${bill.toFixed(2)} for ${u} units at $${rate}/unit`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Electricity Calculator',
      input: `${u} units`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Electricity Bill Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Units Consumed (kWh)</Label>
          <Input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Rate per Unit ($)</Label>
          <Input
            type="number"
            value={ratePerUnit}
            onChange={(e) => setRatePerUnit(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
            placeholder="e.g., 0.12"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Calculate Bill
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
