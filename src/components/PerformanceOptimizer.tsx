import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = [
        "/images/11eximoverseas-logo.png",
        "/images/globalfoods.jpg",
        "/images/jasmine-rice.jpg",
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize font loading
    const optimizeFonts = () => {
      const fontLink = document.createElement("link");
      fontLink.rel = "preload";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
      fontLink.as = "style";
      fontLink.onload = () => {
        fontLink.onload = null;
        fontLink.rel = "stylesheet";
      };
      document.head.appendChild(fontLink);
    };

    // Add resource hints
    const addResourceHints = () => {
      const hints = [
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        { rel: "dns-prefetch", href: "//fonts.gstatic.com" },
        { rel: "preconnect", href: "https://www.google-analytics.com" },
        { rel: "preconnect", href: "https://www.googletagmanager.com" },
      ];

      hints.forEach((hint) => {
        const link = document.createElement("link");
        link.rel = hint.rel;
        link.href = hint.href;
        document.head.appendChild(link);
      });
    };

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        // Add loading="lazy" to images below the fold
        if (!img.hasAttribute("loading")) {
          img.setAttribute("loading", "lazy");
        }

        // Add decoding="async" for better performance
        if (!img.hasAttribute("decoding")) {
          img.setAttribute("decoding", "async");
        }
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeFonts();
    addResourceHints();

    // Optimize images after a short delay to ensure DOM is ready
    setTimeout(optimizeImages, 100);

    // Cleanup function
    return () => {
      // Remove any added elements if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;
