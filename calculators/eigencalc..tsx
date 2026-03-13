import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EigenCalculator() {
  const [matrix, setMatrix] = useState<number[][]>([[1, 2], [3, 4]]);
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const updateValue = (i: number, j: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const calculate = () => {
    // For 2x2 matrix: eigenvalues from characteristic equation
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];

    const trace = a + d;
    const det = a * d - b * c;

    const discriminant = trace * trace - 4 * det;
    
    let stepList = [
      `Step 1: Matrix = [[${a}, ${b}], [${c}, ${d}]]`,
      `Step 2: Characteristic equation: λ² - (trace)λ + det = 0`,
      `Step 3: Trace = ${a} + ${d} = ${trace}`,
      `Step 4: Determinant = ${a}×${d} - ${b}×${c} = ${det}`,
      `Step 5: λ² - ${trace}λ + ${det} = 0`,
    ];

    if (discriminant >= 0) {
      const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
      const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
      stepList.push(`Step 6: Eigenvalue 1 (λ₁) = ${lambda1.toFixed(4)}`);
      stepList.push(`Step 7: Eigenvalue 2 (λ₂) = ${lambda2.toFixed(4)}`);
      setResult(`Eigenvalues: λ₁ = ${lambda1.toFixed(4)}, λ₂ = ${lambda2.toFixed(4)}`);
    } else {
      stepList.push(`Step 6: Complex eigenvalues (discriminant < 0)`);
      setResult('Complex eigenvalues detected');
    }

    setSteps(stepList);

    // Save to history
    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Eigenvalue Calculator',
      input: JSON.stringify(matrix),
      result: result || 'Calculated',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Eigenvalues & Eigenvectors</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph mb-2 block">2x2 Matrix</Label>
          <div className="grid grid-cols-2 gap-2">
            {matrix.map((row, i) =>
              row.map((val, j) => (
                <Input
                  key={`${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateValue(i, j, e.target.value)}
                  className="bg-background/50 border-primary/30 text-foreground text-center"
                />
              ))
            )}
          </div>
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Calculate Eigenvalues
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-primary/30">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Step-by-Step Solution:</h3>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <p key={index} className="font-paragraph text-foreground/90">
                  {step}
                </p>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/20 border border-primary">
              <p className="font-heading text-lg font-bold text-primary">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
