import { PrismaClient } from '@/generated/prisma/client';
import { SessionCreateManyInput } from '@/generated/prisma/models';
import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.DATABASE_URL ?? '';
const prisma = url
  ? new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
  : undefined;

type BuildSessionOverrides = Partial<SessionCreateManyInput>;

export function buildSession(
  overrides: BuildSessionOverrides = {}
): SessionCreateManyInput {
  return {
    title: `Sessão ${faker.number.int({ min: 1, max: 20 })} - ${faker.lorem.paragraph(1)}`,
    note: [
      `Resumo: ${faker.lorem.sentences(2)}`,
      `Eventos: ${faker.lorem.sentences(2)}`,
      `Ganchos: ${faker.lorem.sentences(1)}`,
    ].join('\n\n'),
    sessionDate: faker.date.recent({ days: 60 }),
    ...overrides,
  };
}

export async function seedDatabase() {
  if (!prisma) return;

  const count = Number(process.env.E2E_SEED_COUNT ?? 20);
  await prisma.session.deleteMany();

  const data = Array.from({ length: count }, () => buildSession());
  await prisma.session.createMany({ data });
  await prisma.$disconnect();
}

export async function cleanDatabase() {
  if (!prisma) return;

  await prisma.session.deleteMany();
  await prisma.$disconnect();
}

async function main() {
  await seedDatabase();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
