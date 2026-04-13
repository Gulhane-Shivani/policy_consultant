import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, let the specific component handle it (like Support.jsx)
    // Otherwise, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
