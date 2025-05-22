import type { RegisterFormData as SchemaType } from "@/lib/validation/registerSchema";

export type RegisterFormData = SchemaType;
export interface LoginFormData {
  username: string;
  password: string;
}