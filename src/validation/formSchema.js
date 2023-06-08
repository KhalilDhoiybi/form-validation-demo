const { z } = require("zod");

const userFormSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters long"),
  lastName: z.string().min(3, "Name must be at least 3 characters long"),
});

export default userFormSchema;
