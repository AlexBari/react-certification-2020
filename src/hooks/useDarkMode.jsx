import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDarkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const className = 'dark-mode';
    const element = window.document.body;
    setDarkMode(flag);
    if (flag) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  },[setDarkMode, flag]);

  return isDarkMode;
}
