// src/pages/_app.js
import { AuthProvider } from '@/components/AuthContext'; 

function MyApp({ Component, pageProps }:any) {
  return (
    <AuthProvider> 
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;