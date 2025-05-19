// src/components/chat/ChatBox.tsx
'use client';

import { useState, useEffect } from "react";
import { sendMessageToAI, fetchMessages } from "../../lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Props {
  chatId?: string;
  onChatCreated?: (newChatId: string) => void;
}

export default function ChatBox({ chatId, onChatCreated }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([]);  // Limpiar mensajes
    setInput('');     // Limpiar input
  }, [chatId]);
  
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        const msgs = await fetchMessages(chatId);
        setMessages(msgs);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      }
    };

    loadMessages();
  }, [chatId]);


  const handleSend = async () => {
    if (!input.trim() || !chatId) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setInput("");

    try {
      const { chatId: newChatId, response } = await sendMessageToAI(input, chatId);
      if (!chatId && onChatCreated) {
        onChatCreated(newChatId); // informa al componente padre
      }

      const newAssistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-full w-full">
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-green-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={handleSend}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}