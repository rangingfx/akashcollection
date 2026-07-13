import { useEffect, useState } from 'react';

declare global {
  interface Window {
    tiktokTools?: any;
  }
}

export function useTikTokSDK() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If embed script is already loaded
    const scriptId = 'tiktok-embed-script';
    if (document.getElementById(scriptId)) {
      setIsLoaded(true);
      return;
    }

    // Set timeout to detect blocking (adblockers often block TikTok tracker/scripts)
    const timeout = setTimeout(() => {
      setError(true);
    }, 4500);

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
      clearTimeout(timeout);
    };
    script.onerror = () => {
      setError(true);
      clearTimeout(timeout);
    };

    document.head.appendChild(script);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { isLoaded, error };
}

export default function TikTokSDK() {
  useTikTokSDK();
  return null;
}
