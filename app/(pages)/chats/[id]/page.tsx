import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ChatWindow from "@/components/chat/chat-window";
import { currentUser } from "@clerk/nextjs/server";

interface ChatPageProps {
  params: {
    id: string;
  };
}

async function getChat(chatId: string, userEmail: string) {
  const chat = await db.chat.findUnique({
    where: {
      id: parseInt(chatId),
      members: {
        some: {
          email: userEmail,
        },
      },
    },
    include: {
      members: true,
    },
  });

  return chat;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await currentUser();
  if (!user?.emailAddresses[0]?.emailAddress) {
    notFound();
  }

  const chat = await getChat(params.id, user.emailAddresses[0].emailAddress);
  if (!chat) {
    notFound();
  }

  const currentAlumni = await db.alumni.findFirst({
    where: { email: user.emailAddresses[0].emailAddress },
  });

  if (!currentAlumni) {
    notFound();
  }

  const otherMember = chat.members.find((m) => m.id !== currentAlumni.id);
  if (!otherMember) {
    notFound();
  }

  return (
    <div className="container py-8">
      <ChatWindow
        chatId={chat.id}
        currentUserId={currentAlumni.id}
        otherUser={{
          id: otherMember.id,
          firstName: otherMember.firstName,
          lastName: otherMember.lastName,
        }}
      />
    </div>
  );
}
