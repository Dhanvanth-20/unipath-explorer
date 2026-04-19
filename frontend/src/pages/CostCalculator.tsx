import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { countries } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign } from "lucide-react";
import { CurrencyConverter } from "@/components/ui/CurrencyConverter";

// Currency symbols mapping
  const currencySymbols: Record<string, string> = {
  USD: "$",
  GBP: "£",
  CAD: "$",
  AUD: "$",
  EUR: "€",
  INR: "₹",
  JPY: "¥",
  CNY: "¥",
};

export default function CostCalculator() {
  const [country, setCountry] = useState("");
  const [tuition, setTuition] = useState("");
  const [living, setLiving] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [duration, setDuration] = useState("2");
  const [result, setResult] = useState<{ yearly: number; total: number } | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<string>("");

  // Get selected country's currency
  const selectedCountry = countries.find((c) => c.id === country);
  const countryCurrency = selectedCountry?.currency || "USD";
  const currencySymbol = currencySymbols[countryCurrency] || "$";

  const handleCountryChange = (id: string) => {
    setCountry(id);
    setResult(null);
    setCalculatedAmount("");
    const c = countries.find((x) => x.id === id);
    if (c) {
      setTuition(String(Math.round((c.tuitionFee.min + c.tuitionFee.max) / 2)));
      setLiving(String(c.costOfLiving));
    }
  };

  const calculate = () => {
    const t = parseFloat(tuition) || 0;
    const l = parseFloat(living) || 0;
    const s = parseFloat(scholarship) || 0;
    const d = parseInt(duration) || 1;
    const yearly = t + l - s;
    const total = yearly * d;
    setResult({ yearly, total });
    setCalculatedAmount(String(total));
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Cost <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-muted-foreground mb-8">Estimate your total study abroad expenses.</p>

          <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
            <div>
              <Label>Country</Label>
              <Select value={country} onValueChange={handleCountryChange}>
                <SelectTrigger className="mt-1.5 bg-background"><SelectValue placeholder="Select a country" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {countries.map((c) => <SelectItem key={c.id} value={c.id}>{c.flag} {c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Tuition ({currencySymbol}/yr)</Label>
                <Input type="number" value={tuition} onChange={(e) => setTuition(e.target.value)} placeholder="25000" className="mt-1.5" />
              </div>
              <div>
                <Label>Living Expenses ({currencySymbol}/yr)</Label>
                <Input type="number" value={living} onChange={(e) => setLiving(e.target.value)} placeholder="12000" className="mt-1.5" />
              </div>
              <div>
                <Label>Scholarship Amount ({currencySymbol}/yr)</Label>
                <Input type="number" value={scholarship} onChange={(e) => setScholarship(e.target.value)} placeholder="5000" className="mt-1.5" />
              </div>
              <div>
                <Label>Course Duration (years)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="mt-1.5 bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {[1, 2, 3, 4, 5].map((y) => <SelectItem key={y} value={String(y)}>{y} year{y > 1 ? "s" : ""}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculate} disabled={!country} className="rounded-full px-8 gap-2">
              <Calculator className="h-4 w-4" /> Calculate
            </Button>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 gap-5 mt-8">
              <div className="bg-card border border-border rounded-xl p-6 shadow-card text-center">
                <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Yearly Cost</p>
                <p className="text-3xl font-display font-bold text-foreground">{currencySymbol}{result.yearly.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-card text-center">
                <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total Cost ({duration} yr{parseInt(duration) > 1 ? "s" : ""})</p>
                <p className="text-3xl font-display font-bold text-foreground">{currencySymbol}{result.total.toLocaleString()}</p>
              </div>
            </motion.div>
          )}

          {/* Currency Converter - Shows INR conversion */}
          {calculatedAmount && (
            <div className="mt-8 space-y-4">
              <CurrencyConverter 
                initialAmount={calculatedAmount}
                initialFromCurrency={countryCurrency}
                initialToCurrency="INR"
                simpleDisplay={false}
              />
              

              
              {/* Exchange Rates for Selected Country - Single box */}
              <div className="bg-gradient-indigo text-center p-6 rounded-2xl border-4 border-indigo/30 shadow-xl">
                <h4 className="text-lg font-semibold text-indigo-900 mb-4 uppercase tracking-wide">
                  {selectedCountry?.name || 'Selected Country'} Exchange Rate
                </h4>
                <div className="text-xl font-bold text-indigo-foreground mb-1">
                  1 {countryCurrency} = {
                    country === "usa" ? "~₹93.39" :
                    country === "uk" ? "~₹125.35" :
                    country === "germany" || country === "ireland" ? "~₹109.12" :
                    country === "canada" ? "~₹67.41" :
                    country === "australia" ? "~₹65.80" :
                    "N/A"
                  } INR
                </div>
                <p className="text-sm text-indigo-foreground/80">
                  Rates as of 13-4-2026. Subject to market changes.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
}
