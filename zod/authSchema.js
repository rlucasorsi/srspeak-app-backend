import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().toLowerCase().max(100).email(),
    password: z.string().min(6)
});
