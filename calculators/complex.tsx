import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ComplexConverter() {
  const [type, setType] = useState('polar-to-rect');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    let res = '';
    
    if (type === 'polar-to-rect') {
      const r = parseFloat(input1);
      const theta = parseFloat(input2);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      res = `Rectangular: ${x.toFixed(4)} + ${y.toFixed(4)}i`;
    } else {
      const x = parseFloat(input1);
      const y = parseFloat(input2);
      const r = Math.sqrt(x ** 2 + y ** 2);
      const theta = Math.atan2(y, x);
      res = `Polar: r = ${r.toFixed(4)}, θ = ${theta.toFixed(4)} rad`;
    }

    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Complex Converter',
      input: `${input1}, ${input2}`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Complex Number Converter</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Conversion Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="polar-to-rect">Polar → Rectangular</SelectItem>
              <SelectItem value="rect-to-polar">Rectangular → Polar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph">
            {type === 'polar-to-rect' ? 'Magnitude (r)' : 'Real Part (x)'}
          </Label>
          <Input
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">
            {type === 'polar-to-rect' ? 'Angle (θ in radians)' : 'Imaginary Part (y)'}
          </Label>
          <Input
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground"
          />
        </div>

        <Button
          onClick={convert}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Convert
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-primary/30">
            <p className="font-heading text-lg font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
