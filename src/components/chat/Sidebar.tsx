'use client';

import { Button } from "@/components/ui/button";

import { createNewChat, fetchChats } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChatSummary } from "@/types/chat";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error("Error cargando chats:", error);
      }
    };

    loadChats();
  }, []);

  const handleNavigate = (chatId: string) => {
    router.push(`/chat?chatId=${chatId}`);
  };

  const handleNewChat = async () => {
    try {
      setLoading(true);
      const chatId = await createNewChat();
      router.push(`/chat?chatId=${chatId}`);
    } catch (err) {
      console.error("Error creando chat:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <aside
      className={`bg-white w-64 p-4 border-r shadow-lg fixed lg:static h-[calc(100vh-64px)] z-40 transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-accent">Chats</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
        >
          ✕
        </Button>
      </div>

      <Button onClick={handleNewChat} className="w-full mb-4" disabled={loading}>
        {loading ? "Creando..." : "+ Nuevo Chat"}
      </Button>

      <ul className="space-y-2">
        {chats.map((chat) => (
          <li key={chat.chatId}>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigate(chat.chatId)}
            >
              Chat {chat.chatId.slice(0, 5)}...
            </Button>
          </li>
        ))}
      </ul>

    </aside>
  );
}
