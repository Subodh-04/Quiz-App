const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be atleast of 8 characters" })
    .max(24, { message: "Too Long Password" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 characters" }),
});

module.exports = { signupSchema, loginSchema };
