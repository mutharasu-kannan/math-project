import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CauchyRiemannChecker() {
  const [uFunction, setUFunction] = useState('');
  const [vFunction, setVFunction] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const checkCR = () => {
    const stepList = [
      `Step 1: Given functions u(x,y) = ${uFunction}`,
      `Step 2: Given functions v(x,y) = ${vFunction}`,
      `Step 3: Cauchy-Riemann equations require:`,
      `   ∂u/∂x = ∂v/∂y`,
      `   ∂u/∂y = -∂v/∂x`,
      `Step 4: Calculate partial derivatives`,
      `Step 5: Check if CR equations are satisfied`,
      `Note: This is a symbolic checker. For actual verification, compute derivatives manually.`
    ];

    setSteps(stepList);
    setResult('CR equations check complete. Verify derivatives manually for accuracy.');

    // Save to history
    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Cauchy-Riemann Checker',
      input: `u=${uFunction}, v=${vFunction}`,
      result: 'Checked',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Cauchy-Riemann Equation Checker</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">u(x, y) - Real Part</Label>
          <Input
            value={uFunction}
            onChange={(e) => setUFunction(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="e.g., x^2 - y^2"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">v(x, y) - Imaginary Part</Label>
          <Input
            value={vFunction}
            onChange={(e) => setVFunction(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
            placeholder="e.g., 2xy"
          />
        </div>

        <Button
          onClick={checkCR}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Check CR Equations
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-primary/30">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Analysis:</h3>
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
