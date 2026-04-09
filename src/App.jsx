import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './shared/components/Layout';
import LoadingScreen from './shared/components/LoadingScreen';

import ProtectedRoute from './app/router/ProtectedRoute';

// Lazy load features
const Login = React.lazy(() => import('./features/auth/Login'));
const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'));
const ResourceList = React.lazy(() => import('./features/resources/ResourceList'));
const ResourceDetail = React.lazy(() => import('./features/resources/ResourceDetail'));
const ResourcePage = React.lazy(() => import('./features/resources/ResourcePage'));
const RequirementList = React.lazy(() => import('./features/requirements/RequirementList'));
const RequirementPage = React.lazy(() => import('./features/requirements/RequirementPage'));
const UserList = React.lazy(() => import('./features/users/UserList'));
const UserPage = React.lazy(() => import('./features/users/UserPage'));
const RoleList = React.lazy(() => import('./features/users/RoleList'));
const RolePage = React.lazy(() => import('./features/users/RolePage'));
const ProfilePage = React.lazy(() => import('./features/users/ProfilePage'));
const CompanyList = React.lazy(() => import('./features/companies/CompanyList'));
const CompanyPage = React.lazy(() => import('./features/companies/CompanyPage'));
const ClientList = React.lazy(() => import('./features/clients/ClientList'));
const ClientPage = React.lazy(() => import('./features/clients/ClientPage'));
const VendorList = React.lazy(() => import('./features/vendors/VendorList'));
const VendorPage = React.lazy(() => import('./features/vendors/VendorPage'));
const MatchingEngine = React.lazy(() => import('./features/matching/MatchingEngine'));
const InterviewList = React.lazy(() => import('./features/interviews/InterviewList'));
const InterviewPage = React.lazy(() => import('./features/interviews/InterviewPage'));
const SubmissionPipeline = React.lazy(() => import('./features/submissions/SubmissionPipeline'));
const SubmissionPage = React.lazy(() => import('./features/submissions/SubmissionPage'));
const OfferList = React.lazy(() => import('./features/offers/OfferList'));
const PlacementList = React.lazy(() => import('./features/placements/PlacementList'));
const Reports = React.lazy(() => import('./features/reports/Reports'));
const Notifications = React.lazy(() => import('./features/notifications/Notifications'));
const AuditLogs = React.lazy(() => import('./features/audit/AuditLogs'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="resources" element={<ResourceList />} />
          <Route path="resources/new" element={<ResourcePage />} />
          <Route path="resources/:id" element={<ResourceDetail />} />
          <Route path="resources/:id/edit" element={<ResourcePage />} />
          
          <Route path="requirements" element={<RequirementList />} />
          <Route path="requirements/new" element={<RequirementPage />} />
          <Route path="requirements/:id" element={<RequirementPage />} />
          <Route path="requirements/:id/edit" element={<RequirementPage />} />
          
          <Route path="placements" element={<PlacementList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          
          <Route path="profile" element={<ProfilePage />} />

          <Route path="users" element={<UserList />} />
          <Route path="users/new" element={<UserPage />} />
          <Route path="users/:id" element={<UserPage />} />
          <Route path="users/:id/edit" element={<UserPage />} />
          
          <Route path="roles" element={<RoleList />} />
          <Route path="roles/new" element={<RolePage />} />
          <Route path="roles/:id" element={<RolePage />} />
          <Route path="roles/:id/edit" element={<RolePage />} />
          
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/new" element={<CompanyPage />} />
          <Route path="companies/:id" element={<CompanyPage />} />
          <Route path="companies/:id/edit" element={<CompanyPage />} />
          
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/new" element={<ClientPage />} />
          <Route path="clients/:id" element={<ClientPage />} />
          <Route path="clients/:id/edit" element={<ClientPage />} />
          
          <Route path="vendors" element={<VendorList />} />
          <Route path="vendors/new" element={<VendorPage />} />
          <Route path="vendors/:id" element={<VendorPage />} />
          <Route path="vendors/:id/edit" element={<VendorPage />} />
          
          <Route path="matching" element={<MatchingEngine />} />
          
          <Route path="interviews" element={<InterviewList />} />
          <Route path="interviews/new" element={<InterviewPage />} />
          <Route path="interviews/:id" element={<InterviewPage />} />
          <Route path="interviews/:id/edit" element={<InterviewPage />} />
          
          <Route path="submissions" element={<SubmissionPipeline />} />
          <Route path="submissions/new" element={<SubmissionPage />} />
          <Route path="submissions/:id" element={<SubmissionPage />} />
          <Route path="submissions/:id/edit" element={<SubmissionPage />} />
          
          <Route path="offers" element={<OfferList />} />
          <Route path="placements" element={<PlacementList />} />
          
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="audit" element={<AuditLogs />} />
          {/* Add more routes here as features are implemented */}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
