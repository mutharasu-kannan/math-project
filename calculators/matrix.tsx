import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MatrixCalculator() {
  const [size, setSize] = useState('2');
  const [operation, setOperation] = useState('determinant');
  const [matrix1, setMatrix1] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrix2, setMatrix2] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const updateMatrixSize = (newSize: string) => {
    setSize(newSize);
    const n = parseInt(newSize);
    const newMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
    setMatrix1(newMatrix);
    setMatrix2(newMatrix);
  };

  const updateMatrix1Value = (i: number, j: number, value: string) => {
    const newMatrix = [...matrix1];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrix1(newMatrix);
  };

  const updateMatrix2Value = (i: number, j: number, value: string) => {
    const newMatrix = [...matrix2];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrix2(newMatrix);
  };

  const calculateDeterminant = (matrix: number[][]): number => {
    const n = matrix.length;
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    if (n === 3) {
      return (
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
      );
    }
    return 0;
  };

  const calculate = () => {
    let stepList: string[] = [];
    let res: string = '';

    switch (operation) {
      case 'determinant':
        const det = calculateDeterminant(matrix1);
        stepList = [
          `Step 1: Calculate determinant of ${size}x${size} matrix`,
          `Matrix: ${JSON.stringify(matrix1)}`,
          `Determinant = ${det}`
        ];
        res = `Determinant: ${det}`;
        break;

      case 'add':
        const sum = matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
        stepList = [
          `Step 1: Add corresponding elements`,
          `Result Matrix: ${JSON.stringify(sum)}`
        ];
        res = `Sum Matrix: ${JSON.stringify(sum)}`;
        break;

      case 'multiply':
        const n = parseInt(size);
        const product = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
              product[i][j] += matrix1[i][k] * matrix2[k][j];
            }
          }
        }
        stepList = [
          `Step 1: Multiply matrices`,
          `Result Matrix: ${JSON.stringify(product)}`
        ];
        res = `Product Matrix: ${JSON.stringify(product)}`;
        break;

      case 'inverse':
        const det2 = calculateDeterminant(matrix1);
        if (det2 === 0) {
          res = 'Matrix is singular (determinant = 0), inverse does not exist';
          stepList = ['Matrix is singular, no inverse exists'];
        } else {
          res = 'Inverse calculation (simplified for 2x2)';
          stepList = [`Determinant: ${det2}`, 'Inverse exists'];
        }
        break;
    }

    setResult(res);
    setSteps(stepList);

    // Save to history
    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Matrix Calculator',
      operation: operation,
      input: `${size}x${size} matrix`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Matrix Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Matrix Size</Label>
          <Select value={size} onValueChange={updateMatrixSize}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2x2 Matrix</SelectItem>
              <SelectItem value="3">3x3 Matrix</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph">Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="determinant">Determinant</SelectItem>
              <SelectItem value="add">Addition</SelectItem>
              <SelectItem value="multiply">Multiplication</SelectItem>
              <SelectItem value="inverse">Inverse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph mb-2 block">Matrix 1</Label>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {matrix1.map((row, i) =>
              row.map((val, j) => (
                <Input
                  key={`${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateMatrix1Value(i, j, e.target.value)}
                  className="bg-background/50 border-primary/30 text-foreground text-center"
                />
              ))
            )}
          </div>
        </div>

        {(operation === 'add' || operation === 'multiply') && (
          <div>
            <Label className="text-foreground font-paragraph mb-2 block">Matrix 2</Label>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
              {matrix2.map((row, i) =>
                row.map((val, j) => (
                  <Input
                    key={`${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateMatrix2Value(i, j, e.target.value)}
                    className="bg-background/50 border-primary/30 text-foreground text-center"
                  />
                ))
              )}
            </div>
          </div>
        )}

        <Button
          onClick={calculate}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Calculate
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
              <p className="font-paragraph text-foreground break-words">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
