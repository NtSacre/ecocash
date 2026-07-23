import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { CitizenLayout } from '@/layouts/CitizenLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProtectedRoute } from '@/guard/ProtectedRoute'
import { GuestRoute } from '@/guard/GuestRoute'
import { RoleGuard } from '@/guard/RoleGuard'
import { UserRole } from '@/core/enums/UserRole'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'))

const CitizenHomePage = lazy(() => import('@/pages/citizen/CitizenHomePage'))
const DiscoverPage = lazy(() => import('@/pages/citizen/DiscoverPage'))

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

const ListingsPage = lazy(() => import('@/pages/citizen/ListingsPage'))
const ListingDetailPage = lazy(() => import('@/pages/citizen/ListingDetailPage'))

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<div className="p-6">Chargement...</div>}>{element}</Suspense>
}

const router = createBrowserRouter([
  // --- Public ---
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: withSuspense(<HomePage />) },
      { path: '/unauthorized', element: withSuspense(<UnauthorizedPage />) },
    ],
  },

  // --- Invité uniquement (redirige si déjà connecté) ---
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: withSuspense(<LoginPage />) },
          { path: '/register', element: withSuspense(<RegisterPage />) },
        ],
      },
    ],
  },

  // --- Authentifié : particulier (bottom nav) ---
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={[UserRole.Citizen]} />,
        children: [
          {
            element: <CitizenLayout />,
            children: [
              { path: '/app', element: withSuspense(<CitizenHomePage />) },
              { path: '/app/decouvrir', element: withSuspense(<DiscoverPage />) },
               { path: '/app/annonces', element: withSuspense(<ListingsPage />) },
              { path: '/app/annonces/:id', element: withSuspense(<ListingDetailPage />) },

            ],
          },
        ],
      },
    ],
  },

  // --- Authentifié : partenaire / agent / admin (sidebar) ---
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={[UserRole.Partner, UserRole.Agent, UserRole.SuperAdmin]} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [{ path: '/dashboard', element: withSuspense(<DashboardPage />) }],
          },
        ],
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}