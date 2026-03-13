import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);
  const [result, setResult] = useState<string | null>(null);

  const addSemester = () => {
    setSemesters([...semesters, { gpa: '', credits: '' }]);
  };

  const updateSemester = (index: number, field: 'gpa' | 'credits', value: string) => {
    const updated = [...semesters];
    updated[index][field] = value;
    setSemesters(updated);
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(sem => {
      const gpa = parseFloat(sem.gpa) || 0;
      const credits = parseFloat(sem.credits) || 0;
      totalPoints += gpa * credits;
      totalCredits += credits;
    });

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const res = `CGPA: ${cgpa.toFixed(2)}`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'CGPA Calculator',
      input: `${semesters.length} semesters`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">CGPA Calculator</h2>
      
      <div className="space-y-4">
        {semesters.map((sem, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-foreground font-paragraph text-sm">Semester GPA</Label>
              <Input
                type="number"
                value={sem.gpa}
                onChange={(e) => updateSemester(index, 'gpa', e.target.value)}
                className="bg-background/50 border-accent-gradient-end/30 text-foreground"
                placeholder="3.5"
              />
            </div>
            <div>
              <Label className="text-foreground font-paragraph text-sm">Credits</Label>
              <Input
                type="number"
                value={sem.credits}
                onChange={(e) => updateSemester(index, 'credits', e.target.value)}
                className="bg-background/50 border-accent-gradient-end/30 text-foreground"
                placeholder="18"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addSemester}
          variant="outline"
          className="w-full border-accent-gradient-end/30 text-foreground hover:bg-accent-gradient-end/10"
        >
          Add Semester
        </Button>

        <Button
          onClick={calculate}
          className="w-full bg-accent-gradient-end text-primary-foreground hover:bg-accent-gradient-end/90"
        >
          Calculate CGPA
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
