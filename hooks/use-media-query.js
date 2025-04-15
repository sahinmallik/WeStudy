"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      // Set initial value
      setMatches(media.matches);

      // Set up listener for changes
      const listener = (event) => {
        setMatches(event.matches);
      };

      // Modern way to add listener
      if (media.addEventListener) {
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
      } else {
        // Fallback for older browsers
        media.addListener(listener);
        return () => media.removeListener(listener);
      }
    }
  }, [query]);

  return matches;
}
