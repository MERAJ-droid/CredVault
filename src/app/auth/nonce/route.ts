import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(Math.random().toString(36).slice(2))
}
