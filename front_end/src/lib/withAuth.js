import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SkeletonMainLoader from 'src/skeletons/SkeletonMainLoader';

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
      return <SkeletonMainLoader />
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
