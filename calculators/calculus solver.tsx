import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CalculusSolver() {
  const [type, setType] = useState('derivative');
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const solve = () => {
    const stepList: string[] = [];
    let res = '';

    stepList.push(`Step 1: Given expression: ${expression}`);
    stepList.push(`Step 2: Variable: ${variable}`);
    stepList.push(`Step 3: Operation: ${type}`);
    stepList.push(`Step 4: Apply calculus rules`);
    stepList.push(`Note: This is a symbolic calculator. Compute manually for exact results.`);

    res = `${type} of ${expression} with respect to ${variable}`;

    setSteps(stepList);
    setResult(res);

    // Save to history
    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Calculus Solver',
      input: `${type}: ${expression}`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Calculus Solver</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Operation Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="derivative">Derivative (dy/dx)</SelectItem>
              <SelectItem value="integral">Integral (∫)</SelectItem>
              <SelectItem value="partial">Partial Derivative (∂/∂x)</SelectItem>
              <SelectItem value="limit">Limit</SelectItem>
              <SelectItem value="line">Line Integral</SelectItem>
              <SelectItem value="surface">Surface Integral</SelectItem>
              <SelectItem value="curl">Curl Integral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Expression</Label>
          <Input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="e.g., x^2 + 3x + 5"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Variable</Label>
          <Input
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="x or y"
          />
        </div>

        <Button
          onClick={solve}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Solve
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-primary/30">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Solution:</h3>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <p key={index} className="font-paragraph text-foreground/90 text-sm">
                  {step}
                </p>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/20 border border-primary">
              <p className="font-paragraph text-foreground">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
