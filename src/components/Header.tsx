
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Image Compressor</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-colors"
          >
            <a
              href="https://www.paypal.com/paypalme/NAUTBOL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Donate</span>
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
          >
            <a
              href="https://www.kuantyk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">More Apps</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
