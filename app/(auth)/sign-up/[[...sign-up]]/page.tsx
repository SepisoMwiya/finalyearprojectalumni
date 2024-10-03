import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-240px)]">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-[#2e7d32] hover:bg-[#1b5e20] text-sm normal-case",
            card: "bg-white shadow-md rounded-md",
            headerTitle: "text-[#2e7d32] font-bold",
            headerSubtitle: "text-gray-600",
            socialButtonsBlockButton:
              "border-2 border-gray-300 hover:bg-gray-100",
            formFieldInput:
              "border-2 border-gray-200 focus:border-[#2e7d32] focus:ring-[#2e7d32]",
            footerActionLink: "text-[#2e7d32] hover:text-[#1b5e20]",
          },
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
          },
        }}
      />
    </div>
  );
}
