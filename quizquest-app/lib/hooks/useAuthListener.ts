import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { useAppStore } from '@/lib/state/appStore';
import type { User as LoggedInUser } from '@/lib/types/user/User';

export function useAuthListener() {
  const setAuthStatus = useAppStore((s) => s.setAuthStatus);
  const setAuthUser = useAppStore((s) => s.setAuthUser);
  const setUserDoc = useAppStore((s) => s.setUserDoc);
  const resetAll = useAppStore((s) => s.resetAll);

  const userDocUnsubRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    const stopAuth = onAuthStateChanged(
      auth,
      (fbUser) => {
        // stop old user doc listener if any
        if (userDocUnsubRef.current) {
          userDocUnsubRef.current();
          userDocUnsubRef.current = null;
        }

        if (!fbUser) {
          // logged out
          resetAll();
          return;
        }

        console.log('Auth: User logged in:', fbUser.email);
        setAuthStatus('loggedIn');
        setAuthUser({ uid: fbUser.uid, email: fbUser.email });

        // start listening to users/{uid}
        const ref = doc(db, 'users', fbUser.uid);

        userDocUnsubRef.current = onSnapshot(
          ref,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data() as LoggedInUser;
              console.log('Auth: User data loaded');
              setUserDoc(data);
            } else {
              console.log('Auth: User document not found in Firestore');
              setUserDoc(null);
            }
          },
          (error) => {
            console.error('Auth: Firestore error:', error.message);
            setUserDoc(null);
          }
        );
      },
      (error) => {
        console.error('Auth: Authentication error:', error);
        setAuthStatus('loggedOut');
        resetAll();
      }
    );

    setAuthStatus('loading');

    return () => {
      stopAuth();
      if (userDocUnsubRef.current) userDocUnsubRef.current();
    };
  }, [setAuthStatus, setAuthUser, setUserDoc, resetAll]);
}
