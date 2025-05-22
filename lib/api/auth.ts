import axios from "axios";
import type { RegisterFormData, LoginFormData } from "@/types/auth";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axios.post("/api/register", data);
  return response.data;
};

export const loginUser = async (formData: LoginFormData) => {
  const response = await axios.post("/api/login", formData);
  return response.data;
};
