export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatSummary {
  chatId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}