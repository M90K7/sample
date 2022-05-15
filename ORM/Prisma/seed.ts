import { PrismaClient, Role } from "@prisma/client";
import { roles } from "./seed-data";

const client = new PrismaClient();

const seed_v1 = async () => {

  await client.role.createMany({
    data: roles as Role[],
  });

  await client.$disconnect();
};

seed_v1();
