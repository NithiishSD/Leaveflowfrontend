import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { LoginPage } from './pages/LoginPage';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { HRDashboard } from './pages/HRDashboard';
import { mockUsers, mockLeaveRequests } from './data/mockData';
export function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const handleLogin = (email,role) => {
    const user = mockUsers.find((u) => u.role === role) || {
      id:
      role === 'employee' ?
      'emp-001' :
      role === 'manager' ?
      'mgr-001' :
      'hr-001',
      name:
      role === 'employee' ?
      'John Employee' :
      role === 'manager' ?
      'Sarah Manager' :
      'Alex HR',
      email: email,
      role: role,
      department: role === 'hr' ? 'Human Resources' : 'Engineering'
    };
    setCurrentUser(user);
    setCurrentPage(`${role}-dashboard`);
    toast.success(`Welcome back, ${user.name}!`);
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    toast.info('You have been logged out');
  };
  const handleSubmitRequest = (data) => {
    if (!currentUser) return;
    const newRequest = {
      id: `LR-2024-${String(leaveRequests.length + 1).padStart(3, '0')}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      status: 'pending-manager',
      documents: data.documents,
      signatureConfirmed: data.signatureConfirmed,
      signatureName: data.signatureName,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setLeaveRequests((prev) => [newRequest, ...prev]);
    toast.success('Leave request submitted successfully!');
  };
  const handleApprove = (requestId, comment) => {
    if (!currentUser) return;
    setLeaveRequests((prev) =>
    prev.map((request) => {
      if (request.id !== requestId) return request;
      const newStatus =
      currentUser.role === 'manager' ? 'pending-hr' : 'approved';
      const newComments = comment ?
      [
      ...request.comments,
      {
        id: `cmt-${Date.now()}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        content: comment,
        createdAt: new Date().toISOString()
      }] :

      request.comments;
      return {
        ...request,
        status: newStatus,
        comments: newComments,
        updatedAt: new Date().toISOString()
      };
    })
    );
    const statusMessage =
    currentUser.role === 'manager' ?
    'Request approved and forwarded to HR' :
    'Request approved successfully';
    toast.success(statusMessage);
  };
  const handleReject = (requestId, comment) => {
    if (!currentUser) return;
    setLeaveRequests((prev) =>
    prev.map((request) => {
      if (request.id !== requestId) return request;
      return {
        ...request,
        status: 'rejected',
        comments: [
        ...request.comments,
        {
          id: `cmt-${Date.now()}`,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorRole: currentUser.role,
          content: comment,
          createdAt: new Date().toISOString()
        }],

        updatedAt: new Date().toISOString()
      };
    })
    );
    toast.error('Request has been rejected');
  };
  const handleReturn = (requestId, comment) => {
    if (!currentUser) return;
    setLeaveRequests((prev) =>
    prev.map((request) => {
      if (request.id !== requestId) return request;
      return {
        ...request,
        status: 'returned',
        comments: [
        ...request.comments,
        {
          id: `cmt-${Date.now()}`,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorRole: currentUser.role,
          content: comment,
          createdAt: new Date().toISOString()
        }],

        updatedAt: new Date().toISOString()
      };
    })
    );
    toast.warning('Request returned for fixes');
  };
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          duration: 4000
        }} />


      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}

      {currentPage === 'employee-dashboard' && currentUser &&
      <EmployeeDashboard
        user={currentUser}
        requests={leaveRequests}
        onLogout={handleLogout}
        onSubmitRequest={handleSubmitRequest} />

      }

      {currentPage === 'manager-dashboard' && currentUser &&
      <ManagerDashboard
        user={currentUser}
        requests={leaveRequests}
        onLogout={handleLogout}
        onApprove={handleApprove}
        onReject={handleReject}
        onReturn={handleReturn} />

      }

      {currentPage === 'hr-dashboard' && currentUser &&
      <HRDashboard
        user={currentUser}
        requests={leaveRequests}
        onLogout={handleLogout}
        onApprove={handleApprove}
        onReject={handleReject}
        onReturn={handleReturn} />

      }
    </>);

}
