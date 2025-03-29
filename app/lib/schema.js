import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string({
    required_error: "Please enter a subject name",
  }),
  code: z.string({
    required_error: "Please enter a subject code",
  }),
});
