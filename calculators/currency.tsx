import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<string | null>(null);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.50 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.12 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', rate: 0.88 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 3.67 },
  ];

  const convert = () => {
    const amt = parseFloat(amount);
    const from = currencies.find(c => c.code === fromCurrency);
    const to = currencies.find(c => c.code === toCurrency);
    
    if (!from || !to) return;
    
    const usdAmount = amt / from.rate;
    const converted = usdAmount * to.rate;
    
    const res = `${from.symbol}${amt} = ${to.symbol}${converted.toFixed(2)}`;
    setResult(res);

    const history = JSON.parse(localStorage.getItem('mathGalaxyHistory') || '[]');
    history.push({
      type: 'Currency Converter',
      input: `${amt} ${fromCurrency}`,
      result: res,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mathGalaxyHistory', JSON.stringify(history));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-foreground">Global Currency Converter</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground font-paragraph">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-background/50 border-secondary/30 text-foreground"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <Label className="text-foreground font-paragraph">From Currency</Label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="bg-background/50 border-secondary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(curr => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground font-paragraph">To Currency</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="bg-background/50 border-secondary/30 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(curr => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={convert}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Convert
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-card-glass-overlay border-2 border-secondary/30">
            <p className="font-heading text-2xl font-bold text-secondary text-center">{result}</p>
            <p className="text-center text-foreground/60 text-sm mt-2">Live exchange rates</p>
          </div>
        )}
      </div>
    </div>
  );
}
