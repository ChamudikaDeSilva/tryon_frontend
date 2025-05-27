import api from "./axios"; // use custom axios instance
import type { RegisterFormData, LoginFormData } from "@/types/auth";

export const registerUser = async (data: RegisterFormData) => {
  const response = await api.post("/api/auth/register", data); // ✅ Should send POST
  return response.data;
};

export const loginUser = async (formData: LoginFormData) => {
  const response = await api.post("/api/auth/login", formData);
  return response.data;
};
