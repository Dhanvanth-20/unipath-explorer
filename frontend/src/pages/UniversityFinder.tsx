import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Bookmark, BookmarkCheck, TrendingUp, TrendingDown, Minus } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { universities, countries, allCourses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTrendingUniversities } from "@/hooks/useRealtimeData";

export default function UniversityFinder() {
  const { data: trendingData } = useTrendingUniversities();
  const [countryFilter, setCountryFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [budgetRange, setBudgetRange] = useState([0, 60000]);
  const [rankingRange, setRankingRange] = useState([1, 200]);
  const [saved, setSaved] = useState<string[]>(["1", "5"]);

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      if (countryFilter !== "all" && u.country !== countryFilter) return false;
      if (courseFilter !== "all" && !u.courses.includes(courseFilter)) return false;
      if (u.tuitionFee < budgetRange[0] || u.tuitionFee > budgetRange[1]) return false;
      if (u.ranking < rankingRange[0] || u.ranking > rankingRange[1]) return false;
      return true;
    });
  }, [countryFilter, courseFilter, budgetRange, rankingRange]);

  const toggleSave = (id: string) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
          University <span className="text-gradient">Finder</span>
        </h1>
        <p className="text-muted-foreground mb-8">Discover universities that match your preferences.</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card sticky top-24 space-y-6">
              <h3 className="font-display font-semibold text-foreground">Filters</h3>

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

              <p className="text-xs text-muted-foreground">{filtered.length} universities found</p>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((u, i) => {
                const country = countries.find((c) => c.id === u.country);
                const isSaved = saved.includes(u.id);
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
                        <button onClick={() => toggleSave(u.id)} className="text-primary hover:scale-110 transition-transform">
                          {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                        </button>
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
                      <div className="text-sm text-muted-foreground mb-4">
                        Courses: {u.courses.slice(0, 2).join(", ")}
                      </div>

                      <Button variant="outline" size="sm" className="mt-auto w-full rounded-full">
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
        </div>
      </div>
    </PageLayout>
  );
}
