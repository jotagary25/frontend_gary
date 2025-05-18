'use client';

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/context/auth-store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setAuthChecked = useAuthStore(state => state.setAuthChecked);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [setAuthenticated, setAuthChecked]);

  return <>{children}</>;
}
