'use client';

import { useAuthStore } from "@/context/auth-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/chat/Sidebar";

export default function ChatPage() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const authChecked = useAuthStore(state => state.authChecked);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.push("/auth");
    }
  }, [authChecked, isAuthenticated]);

  if (!authChecked) {
    return <div className="p-6">Verificando sesión...</div>;
  }

  return (
    <div className="flex h-[calc(100vh)] bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4">
        <div className="lg:hidden mb-4">
          <Button variant="outline" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-white rounded-xl p-8 shadow min-h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Bienvenido al chat</h1>
          <p className="text-gray-600 text-center max-w-md">
            Selecciona un chat existente o crea uno nuevo para comenzar.
          </p>
        </div>
      </main>
    </div>
  );
}
