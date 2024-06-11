import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// add authorization to pages
const withAuth = WrappedComponent => {
  return props => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('auth-token');

      if (!token) {
        router.replace('/pages/login');
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' }}>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
