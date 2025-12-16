import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const useBackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    showButton && (
      <div
        className="scrollTop fixed bottom-8 right-8 w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 text-white flex items-center justify-center rounded-full shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-3xl"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
    
        <span><ChevronUp className="size-9" />
        </span>
      </div>
    )
  );
};

export default useBackToTop;
