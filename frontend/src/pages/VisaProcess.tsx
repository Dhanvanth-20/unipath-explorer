import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/data/mockData";
import { ChevronDown, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const visaData = {
  usa: {
    title: "🇺🇸 USA Student Visa (F-1 Visa)",
    process: [
      "Get admission from a SEVP-approved university",
      "Receive I-20 form",
      "Pay SEVIS fee ($350)",
      "Fill DS-160 form online",
      "Book visa interview",
      "Attend interview at US embassy"
    ],
    documents: [
      "Passport (valid 6+ months)",
      "I-20 form (Certificate of Eligibility for Nonimmigrant Student)",
      "DS-160 confirmation page",
      "SEVIS I-901 fee receipt ($350)",
      "Academic transcripts and degrees",
      "Financial proof (USD $40k+ bank statements)",
      "IELTS (9.0 equivalent), TOEFL (100 equivalent)"
    ],
    processingTime: "~ 2–6 weeks",
    keyPoint: "  ➤ SEVIS fee $350 mandatory\n  ➤ Strong financial proof ($40k+) needed\n  ➤ Interview preparation crucial"
  },
  uk: {
    title: "🇬🇧 UK Student Visa",
    process: [
      "Get admission + CAS (Confirmation of Acceptance for Studies)",
      "Apply online on UK visa portal",
      "Pay visa fee + Immigration Health Surcharge (IHS)",
      "Book biometric appointment",
      "Submit documents"
    ],
    documents: [
      "Passport (valid 6+ months)",
      "CAS letter (Confirmation of Acceptance for Studies)",
      "Financial proof (GBP £13,348+ for London)",
      "IELTS (9.0 equivalent), TOEFL (100 equivalent)",
      "TB test certificate (for Indians)"
    ],
    processingTime: "~ 3 weeks",
    keyPoint: "  ➤ Pay IHS (~£776/year)\n  ➤ TB test required for Indians\n  ➤ CAS from university essential"
  },
  germany: {
    title: "🇩🇪 Germany Student Visa",
    process: [
      "Get admission or preparatory course",
      "Open Blocked Account (~€11,208)",
      "Get health insurance",
      "Book visa appointment",
      "Attend interview"
    ],
    documents: [
      "Passport (valid 6+ months)",
      "University admission letter",
      "Blocked account confirmation (EUR €11,208)",
      "Academic transcripts",
      "SOP (Statement of Purpose)",
      "Health insurance proof"
    ],
    processingTime: "~ 6–12 weeks",
    keyPoint: "  ➤ Blocked account €11,208 mandatory\n  ➤ Health insurance required\n  ➤ APS certificate for Indians"
  },
  canada: {
    title: "🇨🇦 Canada Study Permit",
    process: [
      "Get admission (DLI college)",
      "Prepare GIC (~CAD 10,000)",
      "Apply online",
      "Give biometrics",
      "Wait for approval"
    ],
    documents: [
      "Passport (valid 6+ months)",
      "Offer letter from DLI institution",
      "SOP (Statement of Purpose)",
      "Financial proof incl GIC (CAD $10k)",
      "IELTS (9.0 equivalent), TOEFL (100 equivalent)",
      "Medical exam (if required)"
    ],
    processingTime: "~ 4–8 weeks",
    keyPoint: "  ➤ GIC CAD 10,000 proof\n  ➤ DLI school only\n  ➤ Biometrics mandatory"
  },
  australia: {
    title: "🇦🇺 Australia Student Visa (Subclass 500)",
    process: [
      "Get admission + CoE (Confirmation of Enrollment)",
      "Create ImmiAccount",
      "Submit application",
      "Give biometrics & medical",
      "Wait for decision"
    ],
    documents: [
      "Passport (valid 6+ months)",
      "CoE (Confirmation of Enrolment)",
      "GTE/GS statement (Genuine Temporary Entrant / Genuine Student)",
      "Financial proof (AUD $24k+)",
      "IELTS (9.0 equivalent), TOEFL (100 equivalent)"
    ],
    processingTime: "~ 4–6 weeks",
    keyPoint: "  ➤ Genuine Student (GS) statement\n  ➤ OSHC health insurance\n  ➤ High financial requirements"
  },
  ireland: {
    title: "🇮🇪 Ireland Student Visa",
    process: [
      "Get admission",
      "Pay tuition fees (partial/full)",
      "Apply online visa",
      "Submit documents to embassy"
    ],
    documents: [
      "Passport (valid 6+ months)",
      "Offer letter from Irish institution",
      "Fee payment receipt (first semester)",
      "Financial proof (EUR €10k+)",
      "IELTS (9.0 equivalent), TOEFL (100 equivalent)"
    ],
    processingTime: "~ 4–8 weeks",
    keyPoint: "  ➤ Pay first year tuition upfront\n  ➤ Strict funds proof (€10k+)\n  ➤ Private medical insurance"
  }
};

export default function VisaProcess() {
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const data = visaData[selectedCountry as keyof typeof visaData];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Visa <span className="text-gradient">Process</span>
          </h1>
          <p className="text-muted-foreground mb-8">Complete guide for student visas in top study destinations.</p>

          <div className="bg-card border border-border rounded-xl p-8 shadow-card mb-8">
            <label className="text-lg font-semibold text-foreground mb-4 block">Select Country</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Process + Prerequisites side by side */}
            <div className="space-y-6">
              {/* Process */}
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2 mb-4">
                  {data.title}
                </h2>
                <div className="bg-gradient-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-3 mb-4">
                    📝 Process Steps
                  </h3>
                  <ul className="space-y-2">
                    {data.process.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="gradient-primary w-6 h-6 rounded-full flex items-center justify-center mt-0.5 font-semibold text-xs text-primary-foreground">
                          {i + 1}
                        </div>
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Processing Time & Key Point below Process */}
                <div className="mt-6 space-y-4">
                  <div className="bg-gradient-warning/5 border border-warning/20 rounded-xl p-6">
                    <h3 className="font-semibold text-warning flex items-center gap-3 mb-3">
                      ⏱️ Processing Time
                    </h3>
                    <p className="text-2xl font-bold text-foreground">{data.processingTime}</p>
                  </div>
                  <div className="bg-gradient-primary/10 border border-primary/30 rounded-xl p-6">
                    <h3 className="font-semibold text-primary flex items-center gap-3 mb-3">
                      💡 Important Notes
                    </h3>
                    <p className="whitespace-pre-line text-foreground leading-relaxed">{data.keyPoint}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prerequisites beside Process */}
            <div className="space-y-6">
              <div className="bg-gradient-secondary/10 border border-secondary/30 rounded-xl p-6 h-full">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                  📋 Prerequisites
                </h3>
                <ul className="space-y-3">
                  {data.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-muted/30 hover:bg-muted rounded-xl transition-all group">
                      <div className="gradient-success w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 flex-shrink-0 font-semibold text-sm">
                        {i + 1}
                      </div>
                      <span className="text-foreground font-medium leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>



          {/* Reference Links & Currency Note - Steps 2 & 3 */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Formal Static Note with Links */}
              <div className="bg-amber-50/80 border-4 border-amber-200 rounded-2xl p-6 shadow-xl mt-8 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-amber-900 mb-3 text-center uppercase tracking-wide">
                  Note:
                </h4>
                <div className="text-sm space-y-1 text-center">
                  <a href="https://travel.state.gov" className="text-blue-700 hover:text-blue-800 underline block font-medium">US State Department</a>
                  <a href="https://www.gov.uk" className="text-blue-700 hover:text-blue-800 underline block font-medium">UK Government Portal</a>
                  <a href="https://www.canada.ca" className="text-blue-700 hover:text-blue-800 underline block font-medium">Canada IRCC</a>
                  <a href="https://www.make-it-in-germany.com" className="text-blue-700 hover:text-blue-800 underline block font-medium">Germany Official Site</a>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </PageLayout>
  );
}
