import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProtectedRoute } from '@/guard/ProtectedRoute'
import { GuestRoute } from '@/guard/GuestRoute'
import { RoleGuard } from '@/guard/RoleGuard'
import { UserRole } from '@/core/enums/UserRole'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

const AppHomePage = lazy(() => import('@/pages/AppHomePage'))
const ListingsPage = lazy(() => import('@/pages/citizen/ListingsPage'))
const ListingDetailPage = lazy(() => import('@/pages/citizen/ListingDetailPage'))
const DiscoverPage = lazy(() => import('@/pages/citizen/DiscoverPage'))

const PartnerListingsPage = lazy(() => import('@/pages/partner/PartnerListingsPage'))
const AgentCollectionsPage = lazy(() => import('@/pages/agent/AgentCollectionsPage'))

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const AdminListingsPage = lazy(() => import('@/pages/admin/AdminListingsPage'))

const AdminPartnersPage = lazy(() => import('@/pages/admin/AdminPartnersPage'))
const AdminAgentsPage = lazy(() => import('@/pages/admin/AdminAgentsPage'))
const AdminCollectionSlotsPage = lazy(() => import('@/pages/admin/AdminCollectionSlotsPage'))
const AdminPaymentsPage = lazy(() => import('@/pages/admin/AdminPaymentsPage'))
const AdminAssignmentsPage = lazy(() => import('@/pages/admin/AdminAssignmentsPage'))
const TrackingPage = lazy(() => import('@/pages/citizen/TrackingPage'))
const SlotSelectionPage = lazy(() => import('@/pages/citizen/SlotSelectionPage'))
const PartnerProductsPage = lazy(() => import('@/pages/partner/PartnerProductsPage'))

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<div className="p-6">Chargement...</div>}>{element}</Suspense>
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: withSuspense(<HomePage />) },
      { path: '/unauthorized', element: withSuspense(<UnauthorizedPage />) },
    ],
  },
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
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={[UserRole.Citizen, UserRole.Partner, UserRole.Agent]} />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/app', element: withSuspense(<AppHomePage />) },
              { path: '/app/profil', element: withSuspense(<ProfilePage />) },
              { path: '/app/annonces', element: withSuspense(<ListingsPage />) },
              { path: '/app/suivi', element: withSuspense(<TrackingPage />) },
              { path: '/app/reponses/:responseId/creneau', element: withSuspense(<SlotSelectionPage />) },
              { path: '/app/annonces/:id', element: withSuspense(<ListingDetailPage />) },
              { path: '/app/decouvrir', element: withSuspense(<DiscoverPage />) },
              {
                element: <RoleGuard allowedRoles={[UserRole.Partner]} />,
                children: [
                  { path: '/app/mes-annonces', element: withSuspense(<PartnerListingsPage />) },
                  { path: '/app/mes-produits', element: withSuspense(<PartnerProductsPage />) },
                ],
              },
              {
                element: <RoleGuard allowedRoles={[UserRole.Agent]} />,
                children: [{ path: '/app/collectes', element: withSuspense(<AgentCollectionsPage />) }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={[UserRole.SuperAdmin]} />,
        children: [
         {
  element: <DashboardLayout />,
  children: [
    { path: '/dashboard', element: withSuspense(<DashboardPage />) },
    { path: '/dashboard/annonces', element: withSuspense(<AdminListingsPage />) },
    { path: '/dashboard/partenaires', element: withSuspense(<AdminPartnersPage />) },
    { path: '/dashboard/agents', element: withSuspense(<AdminAgentsPage />) },
    { path: '/dashboard/creneaux', element: withSuspense(<AdminCollectionSlotsPage />) },
    { path: '/dashboard/paiements', element: withSuspense(<AdminPaymentsPage />) },
    { path: '/dashboard/assignations', element: withSuspense(<AdminAssignmentsPage />) },
  ],
},
        ],
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}