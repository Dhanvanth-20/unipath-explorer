import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Search, Calculator, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import heroImage from "@/assets/hero-illustration.png";

const features = [
  { icon: Globe, title: "Country Comparison", description: "Compare tuition, living costs, visa options, and PR pathways across top study destinations.", link: "/compare" },
  { icon: Search, title: "University Finder", description: "Discover universities matching your budget, preferred course, and ranking expectations.", link: "/universities" },
  { icon: Calculator, title: "Cost Calculator", description: "Estimate your total study abroad expenses including tuition, rent, food, and more.", link: "/calculator" },
  { icon: CheckCircle, title: "Eligibility Checker", description: "Find out which countries and universities you qualify for based on your academic profile.", link: "/eligibility" },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } },
};

export default function LandingPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
                Confused About Choosing the Right{" "}
                <span className="text-gradient">Country & University?</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                UniPath simplifies your study abroad journey. Compare countries, find the best universities, check your eligibility, and calculate costs — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/universities">
                  <Button size="lg" className="gap-2 rounded-full px-8">
                    Start Exploring <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/compare">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Compare Countries
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img src={heroImage} alt="Study abroad illustration showing globe with universities" className="w-full animate-float" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Everything You Need to <span className="text-gradient">Decide</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to help you make informed decisions about studying abroad.
            </p>
          </div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={stagger.item}>
                <Link to={f.link} className="block group">
                  <div className="bg-card border border-border rounded-xl p-6 h-full shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                    <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <f.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of students who found their dream university with UniPath.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="rounded-full px-10 font-semibold">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
