import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingBar } from "react-top-loading-bar";

const useTopLoading = () => {
  const location = useLocation();
  const { start, complete } = useLoadingBar({
    color: "orange",
    height: 2,
    
  });

  useEffect(() => {
    function scrollTop() {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    scrollTop();
    start(); // Start loading

    const topLoadingTimer = setTimeout(() => {
      complete(); // Complete loading after 300ms
    }, 10);

    return () => {
      clearTimeout(topLoadingTimer); // Cleanup timeout on unmount or route change
    };
  }, [location.pathname]);
};

export default useTopLoading;
