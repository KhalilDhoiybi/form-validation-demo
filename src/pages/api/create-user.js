import { prisma } from "~/utils/db";

export default async function handler(request, response) {
  if (!request.method === "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }
  // data
  const { firstName, lastName } = request.body;
  // validation
  if (!firstName || !lastName) {
    return response.status(422).json({ message: "Invalid input" });
  }
  // prisma create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
    },
  });
  if (!user) {
    return response.status(500).json({ message: "Something went wrong" });
  }
  // response
  return response.status(201).json(user);
}
