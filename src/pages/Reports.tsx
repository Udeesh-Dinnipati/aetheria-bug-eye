
import Navbar from "@/components/Layout/Navbar";
import ReportBuilder from "@/components/Reports/ReportBuilder";

const Reports = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Vulnerability Report Builder</h1>
        <ReportBuilder />
      </main>
    </div>
  );
};

export default Reports;
