import { api } from "@/lib/api/axios";
import type { LoginPayload, LoginResponse } from "@/features/auth/types";

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
}
