import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

function generateCode(): string {
  return crypto.randomBytes(4).toString('hex').toUpperCase().match(/.{4}/g)!.join('-')
}

async function main() {
  console.log('Seeding invite codes...\n')

  const codes: string[] = []
  for (let i = 0; i < 20; i++) {
    const code = generateCode()
    await prisma.inviteCode.create({ data: { code } })
    codes.push(code)
  }

  console.log('Generated 20 invite codes:\n')
  codes.forEach((code) => console.log(`  ${code}`))
  console.log('\nShare these with beta testers.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
