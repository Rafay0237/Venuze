"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useToastStore } from "@/features/ui/store/toast-store";
import type { LoginPayload, LoginResponse } from "@/features/auth/types";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const pushToast = useToastStore((s) => s.push);

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      login(data.token, variables.email);
      pushToast("Logged in successfully", "success");
      const next = searchParams.get("next");
      router.replace(next && next.startsWith("/") ? next : "/");
    },
    onError: (error) => {
      pushToast(error.message || "Invalid credentials", "error");
    },
  });
}
