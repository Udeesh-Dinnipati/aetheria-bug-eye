
import Navbar from "@/components/Layout/Navbar";
import ResourceCard from "@/components/Education/ResourceCard";
import { BookOpen, Search, Shield, FileCode, Bug, Link as LinkIcon, AlertTriangle } from "lucide-react";

const Learn = () => {
  const resources = [
    {
      title: "XSS Fundamentals",
      description: "Learn the basics of Cross-Site Scripting vulnerabilities, how to identify and exploit them.",
      icon: <FileCode className="h-5 w-5" />,
      difficulty: "beginner",
      externalLink: "https://portswigger.net/web-security/cross-site-scripting"
    },
    {
      title: "SQL Injection Guide",
      description: "Comprehensive guide to SQL injection attacks and how to spot them in web applications.",
      icon: <Search className="h-5 w-5" />,
      difficulty: "intermediate",
      externalLink: "https://portswigger.net/web-security/sql-injection"
    },
    {
      title: "Authentication Flaws",
      description: "Understanding common authentication flaws and how to test for them securely.",
      icon: <Shield className="h-5 w-5" />,
      difficulty: "beginner",
      externalLink: "https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication"
    },
    {
      title: "CSRF Vulnerabilities",
      description: "Learn how Cross-Site Request Forgery works and how to identify vulnerable endpoints.",
      icon: <Bug className="h-5 w-5" />,
      difficulty: "intermediate",
      externalLink: "https://portswigger.net/web-security/csrf"
    },
    {
      title: "Server-Side Request Forgery",
      description: "Advanced techniques for finding and exploiting SSRF vulnerabilities.",
      icon: <AlertTriangle className="h-5 w-5" />,
      difficulty: "advanced",
      externalLink: "https://portswigger.net/web-security/ssrf"
    },
    {
      title: "Insecure Direct Object References",
      description: "How to identify and exploit IDOR vulnerabilities in web applications.",
      icon: <LinkIcon className="h-5 w-5" />,
      difficulty: "beginner",
      externalLink: "https://portswigger.net/web-security/access-control/idor"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learn Bug Hunting</h1>
          <p className="text-muted-foreground">Educational resources to help you become a better bug hunter.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-matrix" />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                difficulty={resource.difficulty as any}
                externalLink={resource.externalLink}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;
