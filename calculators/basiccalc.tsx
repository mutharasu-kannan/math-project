import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BasicCalculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert('Please enter valid numbers');
      return;
    }

    let res: number;
    let stepList: string[] = [];

    switch (operation) {
      case 'add':
        res = n1 + n2;
        stepList = [
          `Step 1: Add the numbers`,
          `${n1} + ${n2}`,
          `Result: ${res}`
        ];
        break;
      case 'subtract':
        res = n1 - n2;
        stepList = [
          `Step 1: Subtract the numbers`,
          `${n1} - ${n2}`,
          `Result: ${res}`
        ];
        break;
      case 'multiply':
        res = n1 * n2;
        stepList = [
          `Step 1: Multiply the numbers`,
          `${n1} × ${n2}`,
          `Result: ${res}`
        ];
        break;
      case 'divide':
        if (n2 === 0) {
          alert('Cannot divide by zero');
          return;
        }
        res = n1 / n2;
        stepList = [
          `Step 1: Divide the numbers`,
          `${n1} ÷ ${n2}`,
          `Result: ${res}`
        ];
        break;
      case 'floor':
        res = Math.floor(n1 / n2);
        stepList = [
          `Step 1: Perform floor division`,
          `${n1} ÷ ${n2} = ${n1 / n2}`,
          `Floor value: ${res}`
        ];
        break;
      case 'percentage':
        res = (n1 / 100) * n2;
        stepList = [
          `Step 1: Calculate ${n1}% of ${n2}`,
          `(${n1} / 100) × ${n2}`,
          `Result: ${res}`
        ];
        break;
      default:
        res = 0;
    }

    setResult(res.toString());
    setSteps(stepList);

    // Save to history
    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Basic Calculator',
      operation: operation,
      input: `${n1}, ${n2}`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Basic Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">First Number</Label>
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="Enter first number"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Addition (+)</SelectItem>
              <SelectItem value="subtract">Subtraction (-)</SelectItem>
              <SelectItem value="multiply">Multiplication (×)</SelectItem>
              <SelectItem value="divide">Division (÷)</SelectItem>
              <SelectItem value="floor">Floor Division</SelectItem>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Second Number</Label>
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="Enter second number"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Calculate
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-primary/30">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Solution Steps:</h3>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <p key={index} className="font-paragraph text-foreground/90">
                  {step}
                </p>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/20 border border-primary">
              <p className="font-heading text-xl font-bold text-primary">
                Final Answer: {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
