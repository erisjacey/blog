import { useEffect } from 'react';
import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return <Component {...pageProps} />;
}

export default App;
