
import { Key, Bug, ShieldAlert, FileText, Target, BookOpen, ArrowRight } from "lucide-react";
import FeatureCard from "@/components/Common/FeatureCard";
import VulnerabilityCard from "@/components/Dashboard/VulnerabilityCard";
import Navbar from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Vulnerability Scanner",
      description: "Scan websites for common security vulnerabilities and get detailed reports.",
      icon: <ShieldAlert className="h-6 w-6" />,
      path: "/scanner"
    },
    {
      title: "Learn Bug Hunting",
      description: "Educational resources to help you understand different types of vulnerabilities.",
      icon: <BookOpen className="h-6 w-6" />,
      path: "/learn"
    },
    {
      title: "Report Builder",
      description: "Create professional vulnerability reports for bug bounty submissions.",
      icon: <FileText className="h-6 w-6" />,
      path: "/reports"
    },
    {
      title: "Bounty Programs",
      description: "Find bug bounty programs that match your skills and interests.",
      icon: <Target className="h-6 w-6" />,
      path: "/programs"
    }
  ];

  const vulnerabilities = [
    {
      title: "Cross-Site Scripting (XSS)",
      description: "Attackers can inject client-side scripts into web pages viewed by other users.",
      icon: <Key size={18} />,
      severity: "high"
    },
    {
      title: "SQL Injection",
      description: "Attackers can insert malicious SQL queries into application inputs.",
      icon: <Bug size={18} />,
      severity: "critical"
    },
    {
      title: "Cross-Site Request Forgery",
      description: "Attackers trick users into performing actions they didn't intend to.",
      icon: <ShieldAlert size={18} />,
      severity: "medium"
    },
    {
      title: "Information Disclosure",
      description: "Applications reveal sensitive information through error messages or responses.",
      icon: <FileText size={18} />,
      severity: "low"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-12 md:py-24 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-matrix/10 px-3 py-1 text-sm text-matrix">
                  Ethical Bug Hunting
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Find Bugs. <span className="text-matrix">Earn Rewards.</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your all-in-one platform for ethical bug hunting. Learn how to find vulnerabilities, scan websites, and submit high-quality reports to earn bug bounties.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/scanner">
                    <Button size="lg" className="matrix-glow">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/learn">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex justify-center lg:justify-end lg:mt-0 relative">
                <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px] bg-secondary rounded-lg shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-grid-matrix-small opacity-20"></div>
                  <div className="absolute top-[50%] left-0 w-full h-[1px] bg-matrix/60 shadow-[0_0_10px_rgba(0,255,0,0.7)] animate-scanner"></div>
                  <div className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] border-2 border-dashed border-matrix/30 rounded flex items-center justify-center">
                    <div className="text-2xl font-mono text-matrix animate-pulse-matrix matrix-glow">
                      SECURITY SCAN ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Your Bug Hunting Toolkit
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to start your bug hunting journey and earn bug bounties.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-8">
              {features.map((feature, index) => (
                <Link to={feature.path} key={index}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Common Vulnerabilities Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Common Vulnerabilities
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Learn about these common security issues to find and report them effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-8">
              {vulnerabilities.map((vuln, index) => (
                <VulnerabilityCard
                  key={index}
                  title={vuln.title}
                  description={vuln.description}
                  icon={vuln.icon}
                  severity={vuln.severity as any}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Start Bug Hunting?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Begin your journey today with our comprehensive toolkit and resources.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/scanner">
                  <Button size="lg" className="matrix-glow">
                    Try Scanner Tool
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline">
                    Browse Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BugHunter. All rights reserved. For educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
