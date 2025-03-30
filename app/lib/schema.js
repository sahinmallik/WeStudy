import { z } from "zod";

export const GroupSchema = z.object({
  name: z.string({
    required_error: "Please enter a Group name",
  }),
  subjectTag: z.string({
    required_error: "Please select a subject tag",
  }),
  specialization: z.string({
    required_error: "Please select a specialization",
  }),
});
