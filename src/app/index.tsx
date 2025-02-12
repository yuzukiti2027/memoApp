import { Redirect, router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { auth } from '../config';

const Index = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace('memo/list');
      }
    });
  }, []);
  return <Redirect href="auth/log_in" />;
};

export default Index;
