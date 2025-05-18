'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth-store";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || "Usuario");
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <header className="bg-primary text-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Chat AI</h1>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{userName}</span>
          <Button variant="secondary" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <Button asChild variant="secondary">
          <Link href="/auth">Login</Link>
        </Button>
      )}
    </header>
  );
}
