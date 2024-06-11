import { useEffect } from 'react';
import { useRouter } from 'next/router';


// add authorization to pages
const withAuth = WrappedComponent => {
  return props => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('auth-token');
      console.log('Auth Token:', token);

      if (!token) {
        console.log('No token found, redirecting to login.');
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
