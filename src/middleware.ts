// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserRole = 'admin' | 'instructor' | 'student' | 'guest';

async function getUserSession(request: NextRequest): Promise<{ isAuthenticated: boolean; role: UserRole }> {
  // --- Your ACTUAL logic or SIMULATION here ---
  const token = request.cookies.get('auth_token')?.value;
  if (token === 'valid-admin-token') return { isAuthenticated: true, role: 'admin' };
  if (token === 'valid-instructor-token') return { isAuthenticated: true, role: 'instructor' };
  if (token === 'valid-student-token') return { isAuthenticated: true, role: 'student' };
  return { isAuthenticated: false, role: 'guest' };
  // --- End Simulation ---
}

// Define specific rules (optional for public, but good for clarity)
const routeRules: { path: RegExp; requiredRoles?: UserRole[]; allowUnauthenticated?: boolean; redirectIfAuthenticated?: string }[] = [
  { path: /^\/login$/, redirectIfAuthenticated: '/' },
  { path: /^\/signup$/, redirectIfAuthenticated: '/' },
  { path: /^\/admin(\/.*)?$/, requiredRoles: ['admin'] },
  { path: /^\/courses\/create$/, requiredRoles: ['instructor'] },
  { path: /^\/profile$/, requiredRoles: ['admin', 'instructor', 'student'] },
  { path: /^\/settings$/, requiredRoles: ['admin', 'instructor', 'student'] },
  // You COULD add public rules here explicitly, e.g.:
  // { path: /^\/$/, allowUnauthenticated: true },
  // { path: /^\/browse$/, allowUnauthenticated: true },
  // { path: /^\/courses\/[^/]+$/, allowUnauthenticated: true }, // Matches /courses/[id]
];

// --- Define Public Path Prefixes ---
const publicPaths = ['/', '/browse', '/courses/', '/series/', '/unauthorized' /* Add other public prefixes */];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { isAuthenticated, role } = await getUserSession(request);

  // Find specific matching rule
  const applicableRule = routeRules.find(rule => rule.path.test(pathname));

  // Handle redirection for authenticated users away from auth pages
  if (applicableRule?.redirectIfAuthenticated && isAuthenticated) {
    // ... redirect logic as before ...
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = applicableRule.redirectIfAuthenticated;
    return NextResponse.redirect(redirectUrl);
  }

  // --- REVISED DEFAULT LOGIC ---
  // If NO specific rule matched the path...
  if (!applicableRule) {
    // Check if the user is NOT authenticated AND the path is NOT public
    const isPublic = publicPaths.some(path => pathname.startsWith(path));
    if (!isAuthenticated && !isPublic) {
      // It's not a public path and user is not logged in, redirect to login
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // If it's public OR user is authenticated, allow access (handled by NextResponse.next() below)
  }
  // --- END REVISED DEFAULT LOGIC ---


  // Handle requirements for paths that DID match a rule
  if (applicableRule) {
      // Check auth required but user is not authenticated (skip if allowUnauthenticated is true)
      if (applicableRule.requiredRoles && !isAuthenticated && !applicableRule.allowUnauthenticated) {
          // ... redirect to login logic ...
          const loginUrl = request.nextUrl.clone();
          loginUrl.pathname = '/login';
          loginUrl.searchParams.set('redirectedFrom', pathname);
          return NextResponse.redirect(loginUrl);
      }

      // Check role requirement
      if (applicableRule.requiredRoles && isAuthenticated && !applicableRule.requiredRoles.includes(role)) {
          // ... redirect to unauthorized logic ...
          const unauthorizedUrl = request.nextUrl.clone();
          unauthorizedUrl.pathname = '/unauthorized';
          return NextResponse.redirect(unauthorizedUrl);
      }
  }

  // Allow request to proceed if none of the above redirected
  return NextResponse.next();
}

// Matcher config remains the same
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg)$).*)',
  ],
};