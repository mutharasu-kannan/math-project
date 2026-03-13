import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MarksCalculator() {
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const obt = parseFloat(obtained);
    const tot = parseFloat(total);
    const percentage = (obt / tot) * 100;
    
    const res = `Percentage: ${percentage.toFixed(2)}%`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Marks Calculator',
      input: `${obt}/${tot}`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Marks Percentage Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Marks Obtained</Label>
          <Input
            type="number"
            value={obtained}
            onChange={(e) => setObtained(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Total Marks</Label>
          <Input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-accent-gradient-end text-primary-foreground hover:bg-accent-gradient-end/90"
        >
          Calculate
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
