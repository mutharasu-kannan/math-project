import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CalorieCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    const bmi = w / (h * h);
    
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    
    const res = `BMI: ${bmi.toFixed(2)} - ${category}`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Calorie Calculator',
      input: `Weight: ${w}kg, Height: ${height}cm`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Calorie & BMI Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Weight (kg)</Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Height (cm)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Calculate BMI
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
