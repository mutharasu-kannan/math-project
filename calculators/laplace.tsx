import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LaplaceCalculator() {
  const [type, setType] = useState('forward');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const res = type === 'forward' 
      ? `Laplace Transform of ${expression}`
      : `Inverse Laplace Transform of ${expression}`;
    
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Laplace Transform',
      input: expression,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Laplace Transform</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Transform Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forward">Laplace Transform</SelectItem>
              <SelectItem value="inverse">Inverse Laplace Transform</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Expression</Label>
          <Input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="e.g., t^2 or 1/(s+1)"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Calculate
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-primary/30">
            <p className="font-paragraph text-foreground">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
