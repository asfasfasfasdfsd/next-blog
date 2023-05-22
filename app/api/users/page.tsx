import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getUsers() {
  const users = await prisma.user.findMany({
    where: {
      first_name: {
        equals: 'Mohamed Ali',
      },
      last_name: {
        equals: 'hafdi',
      },
    },
  });
}
