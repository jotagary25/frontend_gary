import { Suspense } from 'react';
import IndexChat from '@/components/chat/IndexChat'

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando chat...</div>}>
      <IndexChat />
    </Suspense>
  );
}
