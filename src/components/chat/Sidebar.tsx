'use client';

import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  // Placeholder de chats (más adelante se conectará a Firestore)
  const chats = [
    { id: "1", name: "Chat con IA" },
    { id: "2", name: "Estudio doce" },
    { id: "3", name: "Ideas Proyecto" },
  ];

  return (
    <aside
      className={`bg-white w-64 p-4 border-r shadow-lg fixed lg:static h-full z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
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

      <Button className="w-full mb-4">+ Nuevo Chat</Button>

      <ul className="space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="p-2 rounded hover:bg-secondary cursor-pointer truncate"
            title={chat.name}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
