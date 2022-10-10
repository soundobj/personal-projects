import { useState, useEffect } from 'react';

export const useIsDevice = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 480;
  const isTablet = width >= 481 && width <= 768;
  const isDesktop = width >= 769;

  return { isMobile, isTablet, isDesktop };
}
