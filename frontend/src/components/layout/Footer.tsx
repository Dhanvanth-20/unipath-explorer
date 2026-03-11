import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="gradient-primary p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">UniPath</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Helping students find the perfect country and university for their study abroad journey.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Compare Countries", path: "/compare" },
                { label: "Find Universities", path: "/universities" },
                { label: "Eligibility Check", path: "/eligibility" },
                { label: "Cost Calculator", path: "/calculator" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              {["Blog", "Visa Guide", "Scholarships", "FAQ"].map((item) => (
                <span key={item} className="text-primary-foreground/70 text-sm cursor-pointer hover:text-primary-foreground transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@unipath.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} UniPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
