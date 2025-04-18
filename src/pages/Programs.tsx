
import Navbar from "@/components/Layout/Navbar";
import BountyPrograms from "@/components/Directory/BountyPrograms";

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Bug Bounty Programs</h1>
        <BountyPrograms />
      </main>
    </div>
  );
};

export default Programs;
