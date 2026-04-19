import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  DollarSign,
  Calendar,
  GraduationCap,
  CheckCircle,
 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { universities, countries, allCourses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type University } from "@/data/mockData";
import { useTrendingUniversities } from "@/hooks/useRealtimeData";

export default function UniversityFinder() {
  const { data: trendingData } = useTrendingUniversities();
  const [countryFilter, setCountryFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [budgetRange, setBudgetRange] = useState([0, 60000]);
  const [rankingRange, setRankingRange] = useState([1, 200]);
  const [publicFilter, setPublicFilter] = useState("all");
  const [intakeFilters, setIntakeFilters] = useState<string[]>([]);
  const [acceptanceRange, setAcceptanceRange] = useState([0, 100]);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let filteredUni = universities;
    
    // Eligibility integration - filter universities that user is eligible for
    const savedEligibility = localStorage.getItem('eligibilityForm');
    if (savedEligibility) {
      try {
        const eligibilityData = JSON.parse(savedEligibility);
        const g = parseFloat(eligibilityData.gpa || '0');
        const b = parseFloat(eligibilityData.budget || '0');
        const testScore = parseFloat(eligibilityData.ieltsScore || eligibilityData.toeflScore || '0');
        const testType = eligibilityData.testType || 'ielts';
        
        if (g > 0 && b > 0 && testScore > 0) {
          const gpa4Scale = (g / 10) * 4;
          filteredUni = filteredUni.filter((u) => {
            const meetsBudget = u.tuitionFee <= b;
            const meetsGpa = gpa4Scale >= u.minGPA - 0.2; // Slightly lenient
            const meetsTest = testType === "ielts" ? testScore >= u.minIELTS - 0.5 : testScore >= u.minTOEFL - 5;
            return meetsBudget && (meetsGpa || meetsTest);
          });
        }
      } catch (e) {
        console.log('Eligibility filter error:', e);
      }
    }

    return filteredUni.filter((u) => {
      if (countryFilter !== "all" && u.country !== countryFilter) return false;
      if (courseFilter !== "all" && !u.courses.includes(courseFilter)) return false;
      if (u.tuitionFee < budgetRange[0] || u.tuitionFee > budgetRange[1]) return false;
      if (u.ranking < rankingRange[0] || u.ranking > rankingRange[1]) return false;
      if (publicFilter !== "all" && ((publicFilter === "public" && !u.isPublic) || (publicFilter === "private" && u.isPublic))) return false;
      if (intakeFilters.length > 0 && !intakeFilters.some((i) => u.intake.includes(i))) return false;
      if (u.acceptanceRate < acceptanceRange[0] || u.acceptanceRate > acceptanceRange[1]) return false;
      return true;
    });
  }, [countryFilter, courseFilter, budgetRange, rankingRange, publicFilter, intakeFilters, acceptanceRange]);



  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
          University <span className="text-gradient">Finder</span>
        </h1>
        <p className="text-muted-foreground mb-8">Discover universities that match your preferences.</p>

        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Sidebar Filters - Static fixed left, neat width */}
          <div className="lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-24 z-10">
            <div className="bg-card border border-border rounded-xl shadow-card p-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-foreground">Filters</h3>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Country</label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((c) => <SelectItem key={c.id} value={c.id}>{c.flag} {c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Course</label>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Courses</SelectItem>
                    {allCourses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Budget: ${budgetRange[0].toLocaleString()} – ${budgetRange[1].toLocaleString()}
                </label>
                <Slider value={budgetRange} onValueChange={setBudgetRange} min={0} max={60000} step={1000} className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Ranking: {rankingRange[0]} – {rankingRange[1]}
                </label>
                <Slider value={rankingRange} onValueChange={setRankingRange} min={1} max={200} step={1} className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Public/Private</label>
                <Select value={publicFilter} onValueChange={setPublicFilter}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Intake</label>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="fall"
                    checked={intakeFilters.includes("Fall (Sep)")}
                    onCheckedChange={(checked) => {
                      setIntakeFilters(
                        checked
                          ? [...intakeFilters, "Fall (Sep)"]
                          : intakeFilters.filter((i) => i !== "Fall (Sep)")
                      );
                    }}
                  />
                  <label htmlFor="fall" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Fall (Sep)
                  </label>
                  <Checkbox
                    id="spring"
                    checked={intakeFilters.includes("Spring (Jan)")}
                    onCheckedChange={(checked) => {
                      setIntakeFilters(
                        checked
                          ? [...intakeFilters, "Spring (Jan)"]
                          : intakeFilters.filter((i) => i !== "Spring (Jan)")
                      );
                    }}
                  />
                  <label htmlFor="spring" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Spring (Jan)
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Acceptance Rate: {acceptanceRange[0]}% – {acceptanceRange[1]}%
                </label>
                <Slider value={acceptanceRange} onValueChange={setAcceptanceRange} min={0} max={100} step={1} className="mt-2" />
              </div>

              <p className="text-xs text-muted-foreground">{filtered.length} universities found</p>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((u, i) => {
                const country = countries.find((c) => c.id === u.country);
                const isSaved = false;
                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="gradient-primary h-2" />
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-semibold text-foreground leading-snug">{u.name}</h3>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{u.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          <Star className="h-3 w-3" /> #{u.ranking}
                        </span>
                        {trendingData && (() => {
                          const trending = trendingData.find((t) => t.id === u.id);
                          if (trending) {
                            return (
                              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                trending.trend === "up" ? "bg-green-500/10 text-green-600" :
                                trending.trend === "down" ? "bg-red-500/10 text-red-600" :
                                "bg-muted text-muted-foreground"
                              }`}>
                                {trending.trend === "up" ? <TrendingUp className="h-3 w-3" /> :
                                 trending.trend === "down" ? <TrendingDown className="h-3 w-3" /> :
                                 <Minus className="h-3 w-3" />}
                                {trending.views}
                              </span>
                            );
                          }
                          return null;
                        })()}
                        <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {country?.flag} {country?.name}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground mb-1">
                        Tuition: <span className="font-semibold text-foreground">${u.tuitionFee.toLocaleString()}/yr</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Min CGPA: <span className="font-semibold text-gradient">{u.minGPA}/10</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        Courses: {u.courses.slice(0, 2).join(", ")}
                      </div>

                      <Button variant="outline" size="sm" className="mt-auto w-full rounded-full" onClick={() => setSelectedUni(u)}>
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No universities match your filters. Try adjusting your criteria.
              </div>
            )}
          </div>

          <Dialog open={!!selectedUni} onOpenChange={() => setSelectedUni(null)}>
            <DialogContent className="backdrop-blur-md max-w-2xl max-h-[85vh] p-0">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle>{selectedUni?.name}</DialogTitle>
                <DialogDescription className="text-base">Key details at a glance</DialogDescription>
              </DialogHeader>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-card p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground text-sm">Location</h4>
                    </div>
                    <p className="text-sm font-medium">{selectedUni?.location}</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground text-sm">Ranking</h4>
                    </div>
                    <p className="text-lg font-bold text-gradient">#{selectedUni?.ranking}</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground text-sm">Tuition</h4>
                    </div>
                    <p className="text-sm font-bold">${selectedUni?.tuitionFee.toLocaleString()}/yr</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Admission</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">GPA</span>
                      <p className="font-semibold">{selectedUni?.minGPA}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">IELTS</span>
                      <p className="font-semibold">{selectedUni?.minIELTS}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">TOEFL</span>
                      <p className="font-semibold">{selectedUni?.minTOEFL}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Acceptance</span>
                      <p className="font-semibold">{selectedUni?.acceptanceRate}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Intake</h3>
                  </div>
                  <div className="flex gap-2">
                    {selectedUni?.intake.map((i) => (
                      <span key={i} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Top Courses</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedUni?.courses.slice(0, 6).map((course) => (
                      <span key={course} className="bg-muted/50 text-muted-foreground hover:bg-muted text-xs px-3 py-1 rounded-full cursor-default transition-colors">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PageLayout>
  );
}
