
import { Link } from "react-router-dom";
import { Bug, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Scanner", href: "/scanner" },
  { label: "Learn", href: "/learn" },
  { label: "Report Builder", href: "/reports" },
  { label: "Programs", href: "/programs" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Bug className="h-6 w-6 text-matrix animate-pulse-matrix" />
          <span className="matrix-glow">BugHunter</span>
        </div>
        
        {!isMobile ? (
          <nav className="flex items-center space-x-4 ml-6">
            {navItems.map((item) => (
              <Button asChild key={item.href} variant="ghost">
                <Link to={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        ) : (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="ml-auto">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button 
                    asChild 
                    key={item.href} 
                    variant="ghost" 
                    onClick={() => setOpen(false)}
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          {!isMobile && (
            <Button variant="outline">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
