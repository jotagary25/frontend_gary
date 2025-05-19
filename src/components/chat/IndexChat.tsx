'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/context/auth-store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/chat/Sidebar";
import ChatBox from "@/components/chat/ChatBox";

export default function ChatPageContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId") ?? undefined;

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const authChecked = useAuthStore(state => state.authChecked);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.push("/auth");
    }
  }, [authChecked, isAuthenticated, router]);

  if (!authChecked) {
    return <div className="p-6">Verificando sesión...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-4 overflow-hidden">
        <div className="lg:hidden mb-4">
          <Button variant="outline" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <ChatBox
          chatId={chatId}
          onChatCreated={(newId) => router.push(`/chat?chatId=${newId}`)}
        />
      </main>
    </div>
  );
}
