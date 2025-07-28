import { useState, useEffect, useMemo } from 'react';

export default function useMediaQuery(query: string) {
  const mediaQueryList = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      return setMatches(e.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => mediaQueryList.removeEventListener('change', listener);
  }, [mediaQueryList]);

  return matches;
}
