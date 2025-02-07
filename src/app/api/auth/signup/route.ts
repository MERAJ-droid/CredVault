import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, walletAddress, userType, organization } = body

    const user = await prisma.user.create({
      data: {
        name,
        email,
        walletAddress,
        userType,
        organization: organization || null
      }
    })

    const token = jwt.sign(
      { userId: user.id, walletAddress },
      process.env.NEXTAUTH_SECRET || 'your-fallback-secret',
      { expiresIn: '7d' }
    )

    return NextResponse.json({ user, token })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Email or wallet address already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
