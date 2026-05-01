import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRightLeft, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-sm"
      >
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="gradient-primary p-4 w-fit rounded-2xl mx-auto shadow-lg">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Welcome to UniPath
              </CardTitle>
              <CardDescription className="text-lg">
                Sign in to unlock your study abroad dashboard
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 p-8">
            <a href="http://localhost:3001/auth/google" className="block w-full">
              <Button 
                type="button"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-primary-foreground/80 border border-primary/20 shadow-xl hover:shadow-2xl hover:from-primary/90 hover:to-primary-foreground hover:-translate-y-0.5 transition-all duration-300 font-semibold text-lg flex items-center gap-3 group"
              >
                <ArrowRightLeft className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Continue with Google
              </Button>
            </a>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground text-center">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-4 w-4 mx-auto" />
                <span>Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Zap className="h-4 w-4 mx-auto" />
                <span>Fast</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          <Link to="/" className="text-primary font-medium hover:underline underline-offset-2">← Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
}
