import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import BecomeMentorForm from "@/components/mentorship/become-mentor-form";

export default async function BecomeMentorPage() {
  const user = await currentUser();

  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!user) {
    redirect("/sign-in");
  }

  const alumni = await db.alumni.findFirst({
    where: { email: userEmail },
    include: {
      mentor: true,
    },
  });

  if (!alumni) {
    redirect("/register");
  }

  if (alumni.mentor) {
    redirect("/mentorship");
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-6">Become a Mentor</h1>
      <BecomeMentorForm />
    </div>
  );
}
