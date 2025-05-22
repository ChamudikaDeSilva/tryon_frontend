import { handleRegister, handleLogin } from "@/lib/services/authService";
import type { RegisterFormData, LoginFormData } from "@/types/auth";

export function useAuth() {
  const register = async (formData: RegisterFormData) => {
    return await handleRegister(formData);
  };

  const login = async (formData: LoginFormData) => {
    return await handleLogin(formData);
  };

  return { register, login };
}
