import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Utilisateur créé !");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

  
