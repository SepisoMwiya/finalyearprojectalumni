import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import MentorshipSection from "@/components/career/mentorship-section";
import Link from "next/link";

export default async function MentorshipPage() {
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
    redirect("/alumni/register");
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mentorship Program</h1>
        {!alumni.mentor && (
          <Link href="/mentorship/become-mentor">
            <Button>Become a Mentor</Button>
          </Link>
        )}
      </div>

      <div className="grid gap-8">
        <MentorshipSection />
      </div>
    </div>
  );
}
