import { useState, useLayoutEffect } from 'react';

export const useMediaQuery = () => {
  const [mobile, setMobile] = useState(false);

  useLayoutEffect(() => {
    const updateScreenSize = () => setMobile(window.innerWidth < 769);
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return mobile;
};
