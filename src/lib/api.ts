import { getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ChatSummary, ChatMessage } from "@/types/chat";
// import type { ChatMessage } from "../types/chat";

export async function sendMessageToAI(message: string, chatId?: string): Promise<{
  chatId: string;
  response: string;
}> {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");

  const token = await getIdToken(user);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, chatId })
  });

  if (!res.ok) {
    throw new Error("Error al enviar mensaje al backend");
  }

  return res.json();
}


export async function createNewChat(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");
  const token = await getIdToken(user);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error("Error al crear un nuevo chat");
  }

  const data = await res.json();
  return data.chatId as string;
};

export async function fetchChats(): Promise<ChatSummary[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");
  const token = await getIdToken(user);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("No se pudieron obtener los chats");
  return res.json();
}

export async function fetchMessages(chatId: string): Promise<ChatMessage[]> {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");
  const token = await getIdToken(user);
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/${chatId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener mensajes del chat");
  }

  const data = await res.json();

  // Convertimos los datos al formato que espera el frontend
  return data.map((msg: ChatMessage) => ({
    id: msg.id || crypto.randomUUID(),
    role: msg.role,
    content: msg.content,
  }));
}
