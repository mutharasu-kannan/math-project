import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GPACalculator() {
  const [subjects, setSubjects] = useState([{ grade: '', credits: '' }]);
  const [result, setResult] = useState<string | null>(null);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: '', credits: '' }]);
  };

  const updateSubject = (index: number, field: 'grade' | 'credits', value: string) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(sub => {
      const points = gradePoints[sub.grade.toUpperCase()] || 0;
      const credits = parseFloat(sub.credits) || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const res = `GPA: ${gpa.toFixed(2)}`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'GPA Calculator',
      input: `${subjects.length} subjects`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">GPA Calculator</h2>
      
      <div className="space-y-4">
        {subjects.map((sub, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-foreground font-paragraph text-sm">Grade</Label>
              <Input
                value={sub.grade}
                onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                className="bg-background/50 border-accent-gradient-end/30 text-foreground"
                placeholder="A, B+, etc."
              />
            </div>
            <div>
              <Label className="text-foreground font-paragraph text-sm">Credits</Label>
              <Input
                type="number"
                value={sub.credits}
                onChange={(e) => updateSubject(index, 'credits', e.target.value)}
                className="bg-background/50 border-accent-gradient-end/30 text-foreground"
                placeholder="3"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addSubject}
          variant="outline"
          className="w-full border-accent-gradient-end/30 text-foreground hover:bg-accent-gradient-end/10"
        >
          Add Subject
        </Button>

        <Button
          onClick={calculate}
          className="w-full bg-accent-gradient-end text-primary-foreground hover:bg-accent-gradient-end/90"
        >
          Calculate GPA
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
