
import { Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/core/config";
import { useState, useEffect } from "react";

const Footer = () => {
  const [counter, setCounter] = useState(0);

  const fetchCounterData = async () => {
    const url = API_URL + "counters/total/resize";
    const response = await fetch(url);
    if (!response.ok) {
      setCounter(0);
    }
    const data = await response.json();
    setCounter(data.counter);
  };

  const formatViews = (num: number) => {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  };

  useEffect(() => {
    fetchCounterData();
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container max-w-screen-2xl py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
            >
              <a
                href="https://x.com/NAUTBOL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-blue-600/10 hover:text-blue-400 transition-colors"
            >
              <a
                href="https://www.linkedin.com/in/leandrotorressilva/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-gray-500/10 hover:text-gray-400 transition-colors"
            >
              <a
                href="https://github.com/NAUTBOL/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub profile"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <p className="text-lg sm:text-xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Loved by +{formatViews(counter)}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
