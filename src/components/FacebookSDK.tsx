import { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export function useFacebookSDK() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If FB is already loaded
    if (window.FB) {
      setIsLoaded(true);
      return;
    }

    // Set timeout to detect blocking (adblockers often block Facebook SDK)
    const timeout = setTimeout(() => {
      if (!window.FB) {
        setError(true);
      }
    }, 4000);

    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      });
      setIsLoaded(true);
      clearTimeout(timeout);
    };

    // Load SDK script safely
    const id = 'facebook-jssdk';
    if (document.getElementById(id)) {
      setIsLoaded(true);
      clearTimeout(timeout);
      return;
    }

    const fjs = document.getElementsByTagName('script')[0];
    const js = document.createElement('script') as HTMLScriptElement;
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    js.async = true;
    js.defer = true;
    js.onerror = () => {
      setError(true);
      clearTimeout(timeout);
    };

    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    } else {
      document.head.appendChild(js);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { isLoaded, error };
}

export default function FacebookSDK() {
  useFacebookSDK();
  return null;
}
