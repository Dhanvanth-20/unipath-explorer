import { motion } from "framer-motion";
import { Bookmark, TrendingUp, Clock, Target, GraduationCap, FileText, CreditCard, PieChart as PieChartIcon, Award, Calendar } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { universities, countries, mockDashboard } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Mock data for the enhanced dashboard
const dashboardStats = {
  universitiesSaved: 12,
  applicationsInProgress: 4,
  estimatedBudget: 85000,
  bestMatchCountry: "USA",
};

const topRecommendations = [
  { id: "1", name: "MIT", country: "usa", match: 95, tuition: 55000 },
  { id: "2", name: "Stanford University", country: "usa", match: 92, tuition: 52000 },
  { id: "3", name: "University of Oxford", country: "uk", match: 88, tuition: 35000 },
];

const applicationProgress = [
  { id: 1, label: "Documents Uploaded", value: 75, color: "bg-primary" },
  { id: 2, label: "SOP Completed", value: 60, color: "bg-blue-500" },
  { id: 3, label: "LOR Submitted", value: 40, color: "bg-amber-500" },
  { id: 4, label: "Payment Pending", value: 20, color: "bg-red-500" },
];

const upcomingDeadlines = [
  { id: 1, label: "Visa Application", date: "2025-03-15", urgent: true },
  { id: 2, label: "Scholarship Deadline", date: "2025-04-01", urgent: true },
  { id: 3, label: "Application Deadline", date: "2025-05-10", urgent: false },
];

const countryInterest = [
  { id: "usa", name: "United States", flag: "🇺🇸", acceptance: "High", avgTuition: 45000 },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", acceptance: "Medium", avgTuition: 28000 },
  { id: "canada", name: "Canada", flag: "🇨🇦", acceptance: "High", avgTuition: 25000 },
  { id: "australia", name: "Australia", flag: "🇦🇺", acceptance: "High", avgTuition: 32000 },
  { id: "germany", name: "Germany", flag: "🇩🇪", acceptance: "Medium", avgTuition: 12000 },
];

const statCards = [
  { label: "Universities Saved", value: dashboardStats.universitiesSaved, icon: GraduationCap, gradient: "from-blue-500 to-cyan-500" },
  { label: "Applications", value: dashboardStats.applicationsInProgress, icon: FileText, gradient: "from-purple-500 to-pink-500" },
  { label: "Est. Budget", value: `$${dashboardStats.estimatedBudget.toLocaleString()}`, icon: CreditCard, gradient: "from-green-500 to-emerald-500" },
  { label: "Best Match", value: dashboardStats.bestMatchCountry, icon: Target, gradient: "from-orange-500 to-red-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const savedUnis = mockDashboard.savedUniversities
    .map((id) => universities.find((u) => u.id === id))
    .filter(Boolean) as typeof universities;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Your <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mb-8">Track your study abroad journey in one place.</p>

          {/* Top Summary Stats */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-xl p-5 shadow-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-display font-bold text-foreground mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Smart Recommendations */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg text-foreground">Top 3 Recommended Universities</h2>
                </div>
                <div className="space-y-3">
                  {topRecommendations.map((uni) => {
                    const c = countries.find((x) => x.id === uni.country);
                    return (
                      <motion.div 
                        key={uni.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{uni.name}</p>
                            <p className="text-sm text-muted-foreground">{c?.flag} {c?.name} · ${uni.tuition.toLocaleString()}/yr</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-sm font-medium text-green-500">{uni.match}%</span>
                            <span className="text-xs text-muted-foreground">Match</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" className="rounded-full text-xs">Quick Apply</Button>
                            <Button variant="outline" size="sm" className="rounded-full text-xs">View</Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Application Progress Tracker */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg text-foreground">Application Progress</h2>
                </div>
                <div className="space-y-4">
                  {applicationProgress.map((progress) => (
                    <div key={progress.id}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-foreground">{progress.label}</span>
                        <span className="text-sm font-medium text-muted-foreground">{progress.value}%</span>
                      </div>
                      <Progress value={progress.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Country Interest Heatmap */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg text-foreground">Country Interest</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {countryInterest.map((country) => (
                    <motion.div
                      key={country.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-medium text-foreground">{country.name}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Acceptance: {country.acceptance}</span>
                        <span className="text-muted-foreground">Avg: ${country.avgTuition.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Saved Universities */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Bookmark className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg text-foreground">Saved Universities</h2>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedUnis.slice(0, 5).map((u) => {
                    const c = countries.find((x) => x.id === u.country);
                    return (
                      <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div>
                          <p className="font-medium text-foreground text-sm">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{c?.flag} {c?.name}</p>
                        </div>
                        <span className="text-xs font-medium text-primary">#{u.ranking}</span>
                      </div>
                    );
                  })}
                </div>
                <Link to="/universities">
                  <Button variant="outline" size="sm" className="mt-4 rounded-full w-full">Browse More</Button>
                </Link>
              </motion.div>

              {/* Budget Overview with Pie Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-5">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg text-foreground">Budget Overview</h2>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-32 h-32">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="20" strokeDasharray="138 251" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="hsl(var(--chart-2))" strokeWidth="20" strokeDasharray="50 251" strokeDashoffset="-138" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="hsl(var(--chart-3))" strokeWidth="20" strokeDasharray="38 251" strokeDashoffset="-188" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-foreground">$60K</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tuition</span>
                    <span className="font-medium">$55,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Living</span>
                    <span className="font-medium">$20,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scholarships</span>
                    <span className="font-medium text-green-500">-$15,000</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2 mt-2">
                    <span className="font-medium">Remaining</span>
                    <span className="font-bold text-primary">$60,000</span>
                  </div>
                </div>
              </motion.div>

              {/* Upcoming Deadlines */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg text-foreground">Upcoming Deadlines</h2>
                </div>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className={`p-3 rounded-lg flex items-center justify-between ${
                        deadline.urgent ? "bg-red-500/10 border border-red-500/20" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${deadline.urgent ? "text-red-500" : "text-muted-foreground"}`} />
                        <span className={`text-sm ${deadline.urgent ? "text-red-500 font-medium" : "text-foreground"}`}>
                          {deadline.label}
                        </span>
                      </div>
                      <span className={`text-xs ${deadline.urgent ? "text-red-500" : "text-muted-foreground"}`}>
                        {deadline.date}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}

