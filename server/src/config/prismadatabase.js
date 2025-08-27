const { PrismaClient } = require('@prisma/client');

// Single instance তৈরি করুন
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Optional: logging enable
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;