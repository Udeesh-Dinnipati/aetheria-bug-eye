
import Navbar from "@/components/Layout/Navbar";
import VulnerabilityScanner from "@/components/Tools/VulnerabilityScanner";

const Scanner = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Vulnerability Scanner</h1>
        <VulnerabilityScanner />
      </main>
    </div>
  );
};

export default Scanner;
