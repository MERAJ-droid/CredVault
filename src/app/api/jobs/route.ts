import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const jobs = [
    {
      id: '1',
      title: 'Blockchain Developer',
      company: 'Web3 Solutions',
      salary: '$120,000 - $150,000',
      location: 'Remote',
      type: 'Full-time',
      requirements: ['Solidity', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'Smart Contract Engineer',
      company: 'DeFi Protocol',
      salary: '$130,000 - $160,000',
      location: 'Hybrid',
      type: 'Full-time',
      requirements: ['Solidity', 'Hardhat', 'TypeScript']
    }
  ]

  return NextResponse.json({ jobs })
}
