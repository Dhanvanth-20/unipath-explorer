import { useState, useEffect } from "react";
import { RefreshCw, ArrowRightLeft } from "lucide-react";
import { useExchangeRates } from "@/hooks/useRealtimeData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
];

interface CurrencyConverterProps {
  className?: string;
  compact?: boolean;
  initialAmount?: string;
  initialFromCurrency?: string;
  initialToCurrency?: string;
  showToCurrency?: boolean;
  simpleDisplay?: boolean;
}

export function CurrencyConverter({ 
  className, 
  compact = false,
  initialAmount,
  initialFromCurrency,
  initialToCurrency,
  showToCurrency = true,
  simpleDisplay = false
}: CurrencyConverterProps) {
  const { data: rates, isLoading, refetch, isRefetching } = useExchangeRates();
  const [amount, setAmount] = useState(initialAmount || "10000");
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency || "USD");
  const [toCurrency, setToCurrency] = useState(initialToCurrency || "INR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Update state when props change
  useEffect(() => {
    if (initialAmount) setAmount(initialAmount);
  }, [initialAmount]);

  useEffect(() => {
    if (initialFromCurrency) setFromCurrency(initialFromCurrency);
  }, [initialFromCurrency]);

  useEffect(() => {
    if (initialToCurrency) setToCurrency(initialToCurrency);
  }, [initialToCurrency]);

  useEffect(() => {
    if (rates && amount) {
      const fromRate = rates.rates[fromCurrency as keyof typeof rates.rates];
      const toRate = rates.rates[toCurrency as keyof typeof rates.rates];
      
      if (fromRate && toRate) {
        const inUSD = parseFloat(amount) / fromRate;
        const converted = inUSD * toRate;
        setConvertedAmount(converted);
      }
    }
  }, [rates, amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currency: string) => {
    const currencyInfo = currencies.find((c) => c.code === currency);
    if (currency === "JPY" || currency === "INR") {
      return `${currencyInfo?.symbol || ""}${Math.round(value).toLocaleString()}`;
    }
    return `${currencyInfo?.symbol || ""}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format number in Indian numbering system (lakhs, crores)
  const formatIndianNumbering = (num: number): string => {
    const rounded = Math.round(num);
    const str = rounded.toString();
    
    if (str.length <= 3) return str;
    
    let result = "";
    let counter = 0;
    
    // Process from right to left
    for (let i = str.length - 1; i >= 0; i--) {
      if (counter === 3) {
        result = "," + result;
        counter = 0;
      }
      // After first 3 digits, use groups of 2
      if (result.replace(",", "").length > 3 && counter === 2) {
        result = "," + result;
        counter = 0;
      }
      result = str[i] + result;
      counter++;
    }
    
    return result;
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <span className="text-muted-foreground">
          {formatCurrency(parseFloat(amount) || 0, fromCurrency)}
        </span>
        <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
        {isLoading ? (
          <span className="text-muted-foreground">...</span>
        ) : (
          <span className="font-semibold text-foreground">
            {convertedAmount !== null ? formatCurrency(convertedAmount, toCurrency) : "—"}
          </span>
        )}
        <Select value={toCurrency} onValueChange={setToCurrency}>
          <SelectTrigger className="h-7 w-20 text-xs bg-transparent border-0 p-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {currencies.map((c) => (
              <SelectItem key={c.code} value={c.code} className="text-xs">
                {c.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Simple display mode - shows only the converted INR amount without dropdowns
  if (simpleDisplay && convertedAmount !== null) {
    return (
      <div className={cn("bg-card border border-border rounded-xl p-4 shadow-card", className)}>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Total Expenses in Indian Rupees
          </p>
          <p className="text-2xl font-display font-bold text-primary">
            ₹{formatIndianNumbering(convertedAmount)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {formatCurrency(parseFloat(amount) || 0, fromCurrency)} = ₹{formatIndianNumbering(convertedAmount)}
          </p>
          {isLoading && (
            <p className="text-xs text-muted-foreground mt-1">Loading exchange rates...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-card border border-border rounded-xl p-4 shadow-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-sm">
          Currency Converter
        </h3>
        <button
          onClick={() => refetch()}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          disabled={isRefetching}
        >
          <RefreshCw
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground",
              isRefetching && "animate-spin"
            )}
          />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs text-muted-foreground">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div>
            <Label className="text-xs text-muted-foreground">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={swapCurrencies}
            className="mb-0.5 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </button>

          <div>
            {showToCurrency ? (
              <>
                <Label className="text-xs text-muted-foreground">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="mt-1 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {currencies.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            ) : (
              <div className="mt-1.5 p-2 bg-muted/50 rounded-md">
                <span className="text-sm font-medium">INR</span>
                <p className="text-xs text-muted-foreground">Indian Rupee</p>
              </div>
            )}
          </div>
        </div>

        {convertedAmount !== null && !isLoading && (
          <div className="mt-4 p-3 rounded-lg bg-primary/10 text-center">
            <p className="text-xs text-muted-foreground">Converted Amount</p>
            <p className="text-xl font-display font-bold text-primary">
              {formatCurrency(convertedAmount, toCurrency)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              1 {fromCurrency} ={" "}
              {rates
                ? (
                    rates.rates[toCurrency as keyof typeof rates.rates] /
                    rates.rates[fromCurrency as keyof typeof rates.rates]
                  ).toFixed(4)
                : "—"}{" "}
              {toCurrency}
            </p>
          </div>
        )}

        {rates && (
          <p className="text-[10px] text-muted-foreground text-center">
            Rates updated: {new Date(rates.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;

