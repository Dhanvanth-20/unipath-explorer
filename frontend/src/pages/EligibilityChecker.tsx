import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { universities, countries } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertTriangle, Trophy } from "lucide-react";

interface Result {
  safe: typeof universities;
  moderate: typeof universities;
  dream: typeof universities;
  eligibleCountries: string[];
}

export default function EligibilityChecker() {
  const [gpa, setGpa] = useState("");
  const [testType, setTestType] = useState<"ielts" | "toefl">("ielts");
  const [ieltsScore, setIeltsScore] = useState("");
  const [toeflScore, setToeflScore] = useState("");
  const [greScore, setGreScore] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [step, setStep] = useState(0);

  // Calculate progress based on filled fields
  const gpaFilled = !!gpa;
  const testFilled = testType === "ielts" ? !!ieltsScore : !!toeflScore;
  const budgetFilled = !!budget;
  
  const progress = Math.round(((gpaFilled ? 1 : 0) + (testFilled ? 1 : 0) + (budgetFilled ? 1 : 0)) / 3 * 100);

  const handleCheck = () => {
    const g = parseFloat(gpa);
    const b = parseFloat(budget);
    
    if (!g || !b) return;

    // Get the test score based on test type
    let testScore = 0;
    if (testType === "ielts") {
      testScore = parseFloat(ieltsScore) || 0;
    } else {
      testScore = parseFloat(toeflScore) || 0;
    }
    
    if (!testScore) return;

    // Filter universities by budget
    const eligible = universities.filter((u) => u.tuitionFee <= b);
    
    // Convert GPA from 10.0 scale to 4.0 scale for comparison
    // University minGPAs are on 4.0 scale, so convert user's 10.0 GPA
    const gpa4Scale = (g / 10) * 4;
    
    // Filter based on test type
    let filtered: typeof universities;
    if (testType === "ielts") {
      // Safe: User's GPA >= university minGPA + 0.3 AND IELTS >= university minIELTS + 0.5
      filtered = eligible.filter((u) => gpa4Scale >= u.minGPA + 0.3 && testScore >= u.minIELTS + 0.5);
    } else {
      // Safe based on TOEFL
      filtered = eligible.filter((u) => gpa4Scale >= u.minGPA + 0.3 && testScore >= u.minTOEFL + 5);
    }

    // Categorize universities
    const safe: typeof universities = [];
    const moderate: typeof universities = [];
    const dream: typeof universities = [];

    eligible.forEach((u) => {
      const uGpa4 = u.minGPA;
      const meetsGpa = gpa4Scale >= uGpa4;
      const meetsTest = testType === "ielts" 
        ? testScore >= u.minIELTS 
        : testScore >= u.minTOEFL;
      
      if (meetsGpa && meetsTest) {
        // Check if it's safe (well above requirements)
        const isSafe = testType === "ielts"
          ? (gpa4Scale >= u.minGPA + 0.3 && testScore >= u.minIELTS + 0.5)
          : (gpa4Scale >= u.minGPA + 0.3 && testScore >= u.minTOEFL + 5);
        
        if (isSafe) {
          safe.push(u);
        } else {
          moderate.push(u);
        }
      } else {
        // Below requirements - dream
        dream.push(u);
      }
    });

    const countryIds = [...new Set(eligible.map((u) => u.country))];
    const eligibleCountries = countryIds.map((id) => countries.find((c) => c.id === id)!.name);

    setResult({ safe, moderate, dream, eligibleCountries });
    setStep(1);
  };

  const categories = result
    ? [
        { label: "Safe", icon: CheckCircle, color: "text-success", bg: "bg-success/10", items: result.safe },
        { label: "Moderate", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", items: result.moderate },
        { label: "Dream", icon: Trophy, color: "text-primary", bg: "bg-primary/10", items: result.dream },
      ]
    : [];

  const isFormValid = () => {
    if (!gpa || !budget) return false;
    if (testType === "ielts" && !ieltsScore) return false;
    if (testType === "toefl" && !toeflScore) return false;
    return true;
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Eligibility <span className="text-gradient">Checker</span>
          </h1>
          <p className="text-muted-foreground mb-8">Enter your academic profile to see where you can apply.</p>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Profile Completion</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {step === 0 && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* GPA */}
                <div>
                  <Label htmlFor="gpa">GPA (10.0) *</Label>
                  <Input 
                    id="gpa" 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="10" 
                    value={gpa} 
                    onChange={(e) => setGpa(e.target.value)} 
                    placeholder="8.5" 
                    className="mt-1.5" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">Scale: 0 - 10.0</p>
                </div>

                {/* Test Type Selector */}
                <div>
                  <Label>English Proficiency Test *</Label>
                  <Select value={testType} onValueChange={(v: "ielts" | "toefl") => setTestType(v)}>
                    <SelectTrigger className="mt-1.5 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="ielts">IELTS</SelectItem>
                      <SelectItem value="toefl">TOEFL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IELTS Score */}
                {testType === "ielts" && (
                  <div>
                    <Label htmlFor="ielts">IELTS Band Score (9.0) *</Label>
                    <Input 
                      id="ielts" 
                      type="number" 
                      step="0.5" 
                      min="0" 
                      max="9" 
                      value={ieltsScore} 
                      onChange={(e) => setIeltsScore(e.target.value)} 
                      placeholder="7.5" 
                      className="mt-1.5" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">Scale: 0 - 9.0</p>
                  </div>
                )}

                {/* TOEFL Score */}
                {testType === "toefl" && (
                  <div>
                    <Label htmlFor="toefl">TOEFL Score (120) *</Label>
                    <Input 
                      id="toefl" 
                      type="number" 
                      min="0" 
                      max="120" 
                      value={toeflScore} 
                      onChange={(e) => setToeflScore(e.target.value)} 
                      placeholder="100" 
                      className="mt-1.5" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">Scale: 0 - 120</p>
                  </div>
                )}

                {/* GRE Score */}
                <div>
                  <Label htmlFor="gre">GRE Score (340) - Optional</Label>
                  <Input 
                    id="gre" 
                    type="number" 
                    min="0" 
                    max="340" 
                    value={greScore} 
                    onChange={(e) => setGreScore(e.target.value)} 
                    placeholder="320" 
                    className="mt-1.5" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">Scale: 0 - 340</p>
                </div>

                {/* Budget */}
                <div>
                  <Label htmlFor="budget">Max Tuition Budget ($/yr) *</Label>
                  <Input 
                    id="budget" 
                    type="number" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    placeholder="35000" 
                    className="mt-1.5" 
                  />
                </div>
              </div>

              <Button 
                onClick={handleCheck} 
                className="rounded-full px-8" 
                disabled={!isFormValid()}
              >
                Check Eligibility
              </Button>
            </div>
          )}

          {step === 1 && result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Eligible countries */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-foreground mb-3">Eligible Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {result.eligibleCountries.length > 0 ? (
                    result.eligibleCountries.map((c) => (
                      <span key={c} className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">{c}</span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">No countries match your budget criteria</span>
                  )}
                </div>
              </div>

              {/* University categories */}
              {categories.map((cat) => (
                <div key={cat.label} className="bg-card border border-border rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg ${cat.bg}`}>
                      <cat.icon className={`h-5 w-5 ${cat.color}`} />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">{cat.label} Universities ({cat.items.length})</h3>
                  </div>
                  {cat.items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No universities in this category.</p>
                  ) : (
                    <div className="space-y-2">
                      {cat.items.map((u) => (
                        <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <span className="font-medium text-foreground text-sm">{u.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">#{u.ranking}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">${u.tuitionFee.toLocaleString()}/yr</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Button variant="outline" onClick={() => setStep(0)} className="rounded-full">
                ← Modify Inputs
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
}

