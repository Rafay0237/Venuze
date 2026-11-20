"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Info } from "lucide-react";
import { useState } from "react";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login-schema";
import { loginRequest } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useToastStore } from "@/features/ui/store/toast-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const pushToast = useToastStore((s) => s.push);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      login(data.token, variables.email);
      pushToast("Logged in successfully", "success");
      const next = searchParams.get("next");
      router.replace(next && next.startsWith("/") ? next : "/");
    },
    onError: (error: Error) => {
      pushToast(error.message || "Invalid credentials", "error");
    },
  });

  return (
    <div className="mx-auto w-full max-w-[420px] px-4 py-10 sm:py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Log in to discover and book venues on Venuze.
        </p>
      </div>

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        noValidate
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          rightSlot={
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="rounded p-1 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          {...register("password")}
        />

        {mutation.isError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {(mutation.error as Error).message || "Unable to log in. Please try again."}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-xl text-base"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Log in
        </Button>
      </form>

      <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-[#FDECEC] px-4 py-3 text-sm text-[#7A2E2E]">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Demo account:{" "}
          <span className="font-semibold">eve.holt@reqres.in</span>
          {" · "}
          password <span className="font-semibold">cityslicka</span>
        </p>
      </div>
    </div>
  );
}
