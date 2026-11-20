import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div className="mx-auto max-w-[420px] px-4 py-16" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
