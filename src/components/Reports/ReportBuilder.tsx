
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Copy, Download, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ReportBuilder = () => {
  const [formData, setFormData] = useState({
    title: "",
    targetUrl: "",
    vulnerability: "",
    severity: "",
    description: "",
    stepsToReproduce: "",
    impact: "",
    recommendation: ""
  });
  const [copied, setCopied] = useState(false);

  // Load scan results from sessionStorage if available
  useEffect(() => {
    const scanResultsJson = sessionStorage.getItem('scanResults');
    if (scanResultsJson) {
      try {
        const scanResults = JSON.parse(scanResultsJson);
        
        // If there are vulnerabilities, use the first one to pre-fill the form
        if (scanResults.vulnerabilities && scanResults.vulnerabilities.length > 0) {
          const vuln = scanResults.vulnerabilities[0];
          
          setFormData({
            title: `${vuln.type} vulnerability found in ${scanResults.url}`,
            targetUrl: scanResults.url,
            vulnerability: vuln.type.toLowerCase(),
            severity: vuln.severity,
            description: vuln.description,
            stepsToReproduce: "1. Navigate to the affected page\n2. Observe the vulnerability",
            impact: "This vulnerability could potentially lead to unauthorized access or data exposure.",
            recommendation: vuln.recommendation
          });
          
          // Clear the sessionStorage after using it
          sessionStorage.removeItem('scanResults');
          
          toast({
            title: "Report Pre-filled",
            description: "Scan results have been loaded into the report builder."
          });
        }
      } catch (error) {
        console.error("Error parsing scan results:", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateReport = () => {
    // Here you would normally validate inputs
    if (!formData.title || !formData.targetUrl || !formData.vulnerability || !formData.severity) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill out all required fields."
      });
      return;
    }

    // For this demo, we'll just simulate a successful report generation
    toast({
      title: "Report Generated",
      description: "Your vulnerability report has been created successfully."
    });
  };

  const copyToClipboard = () => {
    const reportText = `
# Vulnerability Report: ${formData.title}

## Target
${formData.targetUrl}

## Vulnerability Type
${formData.vulnerability}

## Severity
${formData.severity}

## Description
${formData.description}

## Steps to Reproduce
${formData.stepsToReproduce}

## Impact
${formData.impact}

## Recommendation
${formData.recommendation}

## Reported
${new Date().toLocaleDateString()}
    `;

    navigator.clipboard.writeText(reportText).then(
      () => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Report has been copied to clipboard."
        });
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to copy to clipboard."
        });
      }
    );
  };

  const downloadReport = () => {
    const reportText = `
# Vulnerability Report: ${formData.title}

## Target
${formData.targetUrl}

## Vulnerability Type
${formData.vulnerability}

## Severity
${formData.severity}

## Description
${formData.description}

## Steps to Reproduce
${formData.stepsToReproduce}

## Impact
${formData.impact}

## Recommendation
${formData.recommendation}

## Reported
${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vulnerability-report-${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded as a markdown file."
    });
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-matrix/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-matrix" />
            Vulnerability Report Builder
          </CardTitle>
          <CardDescription>
            Create professional vulnerability reports for bug bounty submissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="E.g., XSS Vulnerability in Search Feature" 
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetUrl">Target URL</Label>
              <Input 
                id="targetUrl" 
                name="targetUrl" 
                placeholder="https://example.com/vulnerable-page" 
                value={formData.targetUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vulnerability">Vulnerability Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("vulnerability", value)}
                value={formData.vulnerability}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vulnerability type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xss">Cross-Site Scripting (XSS)</SelectItem>
                  <SelectItem value="sqli">SQL Injection</SelectItem>
                  <SelectItem value="csrf">Cross-Site Request Forgery (CSRF)</SelectItem>
                  <SelectItem value="idor">Insecure Direct Object Reference (IDOR)</SelectItem>
                  <SelectItem value="rce">Remote Code Execution (RCE)</SelectItem>
                  <SelectItem value="ssrf">Server-Side Request Forgery (SSRF)</SelectItem>
                  <SelectItem value="auth">Authentication Bypass</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("severity", value)}
                value={formData.severity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="info">Informational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Vulnerability Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Describe the vulnerability in detail..." 
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stepsToReproduce">Steps to Reproduce</Label>
            <Textarea 
              id="stepsToReproduce" 
              name="stepsToReproduce" 
              placeholder="1. Go to https://example.com\n2. Click on...\n3. Enter the payload..." 
              value={formData.stepsToReproduce}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impact">Potential Impact</Label>
              <Textarea 
                id="impact" 
                name="impact" 
                placeholder="What could an attacker achieve by exploiting this vulnerability?" 
                value={formData.impact}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommendation">Recommendation</Label>
              <Textarea 
                id="recommendation" 
                name="recommendation" 
                placeholder="How can the vulnerability be fixed?" 
                value={formData.recommendation}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={generateReport}>
            Preview Report
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              Copy
            </Button>
            <Button onClick={downloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg">Report Tips</CardTitle>
          <CardDescription>
            Guidelines for effective vulnerability reporting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium text-matrix">Be Clear and Concise</h4>
            <p className="text-sm text-muted-foreground">
              Write your report in a way that's easy for the security team to understand and reproduce.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-matrix">Include Proof of Concept</h4>
            <p className="text-sm text-muted-foreground">
              Whenever possible, include a minimal proof of concept that demonstrates the vulnerability.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-matrix">Explain the Impact</h4>
            <p className="text-sm text-muted-foreground">
              Clearly articulate what an attacker could achieve by exploiting this vulnerability.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-matrix">Suggest a Solution</h4>
            <p className="text-sm text-muted-foreground">
              If you have ideas on how to fix the issue, include them in your report.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportBuilder;
