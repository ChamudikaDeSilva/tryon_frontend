import { registerSchema } from '@/lib/validation/registerSchema';
import { loginSchema } from '@/lib/validation/loginSchema';
import { registerUser, loginUser } from '@/lib/api/auth';
import type { RegisterFormData, LoginFormData } from '@/types/auth';

export async function handleRegister(
  data: RegisterFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    const formatted = parsed.error.format();
    const keys = Object.keys(formatted) as (keyof typeof formatted)[];
    const firstKey = keys[0];

    const firstError =
      typeof formatted[firstKey] === 'object' &&
      formatted[firstKey] !== null &&
      '_errors' in formatted[firstKey] &&
      Array.isArray((formatted[firstKey] as any)._errors)
        ? (formatted[firstKey] as any)._errors[0]
        : 'Validation error';

    return { success: false, error: firstError };
  }

  try {
    await registerUser(parsed.data);
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.response?.data?.message || 'Registration failed',
    };
  }
}

export async function handleLogin(
  data: LoginFormData
): Promise<{ success: boolean; error?: string; token?: string }> {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    const formatted = parsed.error.format();
    const keys = Object.keys(formatted) as (keyof typeof formatted)[];
    const firstKey = keys[0];

    const firstError =
      typeof formatted[firstKey] === 'object' &&
      formatted[firstKey] !== null &&
      '_errors' in formatted[firstKey] &&
      Array.isArray((formatted[firstKey] as any)._errors)
        ? (formatted[firstKey] as any)._errors[0]
        : 'Validation error';

    return { success: false, error: firstError };
  }

  try {
    const response = await loginUser(parsed.data);
    const token = response.token;

    localStorage.setItem('token', token); // Optional
    return { success: true, token };
  } catch (err: any) {
    return {
      success: false,
      error: err.response?.data?.message || 'Login failed',
    };
  }
}
