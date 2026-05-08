import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 1. If user is trying to access ANY admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. ALWAYS allow access to the login page itself, otherwise you can never log in!
    if (request.nextUrl.pathname === '/admin/login') {
      return response
    }

    // 3. If not logged in at all, send to login
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // 4. If logged in, check for Admin Role in database
    const { data: adminData } = await supabase
      .from('admins')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!adminData || adminData.role !== 'admin') {
      // Not an admin? Kick to homepage
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}