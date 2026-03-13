import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GPAConverter() {
  const [gpa, setGpa] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const gpaValue = parseFloat(gpa);
    const percentage = (gpaValue / 4.0) * 100;
    
    const res = `${gpaValue} GPA = ${percentage.toFixed(2)}%`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'GPA Converter',
      input: `${gpaValue} GPA`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">GPA to Percentage Converter</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">GPA (out of 4.0)</Label>
          <Input
            type="number"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="bg-background/50 border-accent-gradient-end/30 text-foreground"
            placeholder="3.5"
            step="0.01"
          />
        </div>

        <Button
          onClick={convert}
          className="w-full bg-accent-gradient-end text-primary-foreground hover:bg-accent-gradient-end/90"
        >
          Convert
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
