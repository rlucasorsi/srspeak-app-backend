import { z } from "zod";

export const requestResetPasswordSchema = z.object({
    email: z.string().toLowerCase().max(100).email()
});

export const codeValidationSchema = z.object({
    email: z.string().toLowerCase().max(100).email(),
    code: z.string().max(6)
});

export const resetPasswordSchema = z.object({
    email: z.string().toLowerCase().max(100).email(),
    code: z.string().max(6),
    newPassword: z.string().max(20)
});