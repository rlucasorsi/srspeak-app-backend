import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().toLowerCase().max(100).email(),
    password: z.string().min(1).max(100),
    roleId: z.number().int(),
    status: z.boolean().default(true)
});

export const UpdateUserSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().toLowerCase().max(100).email().optional(),
    roleId: z.number().int().optional(),
    status: z.boolean().default(true).optional()

});