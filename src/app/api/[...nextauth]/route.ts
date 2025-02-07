import NextAuth, { DefaultSession, Session, AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { JWT } from 'next-auth/jwt'

interface CustomSession extends Session {
  address?: string
  user: DefaultSession['user'] & {
    address?: string
  }
}

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          type: 'text',
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.message || !credentials?.signature) {
            throw new Error('Missing message or signature')
          }

          const siwe = new SiweMessage(JSON.parse(credentials.message))
          const nextAuthUrl = new URL(NEXTAUTH_URL)
          
          const result = await siwe.verify({
            signature: credentials.signature,
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          })

          if (result.success) {
            return {
              id: siwe.address,
              address: siwe.address,
              name: siwe.address.slice(0, 8) + '...' + siwe.address.slice(-6),
            }
          }
          return null
        } catch (e) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        address: token.sub,
        user: {
          ...session.user,
          address: token.sub,
        },
      }
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.sub = user.address
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
