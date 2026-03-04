
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboardIcon,
  ClipboardListIcon,
  UsersIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  RotateCcwIcon } from
'lucide-react';
import { Sidebar } from '../components/ui/Sidebar';
import { TopBar } from '../components/ui/TopBar';
import { Card } from '../components/ui/Card';
import { PendingRequestsTable } from '../components/PendingRequestsTable';
import { RequestDetailModal } from '../components/RequestDetailModal';

const sidebarItems = [
{
  icon: <LayoutDashboardIcon className="w-5 h-5" />,
  label: 'Dashboard',
  key: 'dashboard'
},
{
  icon: <ClipboardListIcon className="w-5 h-5" />,
  label: 'Pending Requests',
  key: 'pending'
}];


export function HRDashboard({
  user,
  requests,
  onLogout,
  onApprove,
  onReject,
  onReturn
}) {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pendingRequests = requests.filter((r) => r.status === 'pending-hr');
  const approvedRequests = requests.filter((r) => r.status === 'approved');

  const today = new Date();
  const employeesOnLeave = approvedRequests.filter((r) => {
    const start = new Date(r.startDate);
    const end = new Date(r.endDate);
    return today >= start && today <= end;
  });

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthlyApproved = approvedRequests.filter((r) => {
    const date = new Date(r.updatedAt);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear);

  });

  const stats = {
    pending: pendingRequests.length,
    onLeave: employeesOnLeave.length,
    monthlyApproved: monthlyApproved.length,
    totalApproved: approvedRequests.length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
    returned: requests.filter((r) => r.status === 'returned').length
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = (requestId, comment) => {
    onApprove(requestId, comment);
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleReject = (requestId, comment) => {
    onReject(requestId, comment);
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleReturn = (requestId, comment) => {
    onReturn(requestId, comment);
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        items={sidebarItems}
        activeItem={activeView}
        onItemClick={setActiveView}
        userName={user.name}
        userRole={user.role}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} />


      <div className="w-full ">
        <TopBar
          userName={user.name}
          userRole={user.role}
          onMenuToggle={() => setSidebarOpen(true)} />


        <main className="p-4 lg:p-6">
          {activeView === 'dashboard' &&
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.3
            }}
            className="space-y-6">

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ClipboardListIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.pending}
                      </p>
                      <p className="text-sm text-gray-500">
                        Pending Final Approval
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UsersIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.onLeave}
                      </p>
                      <p className="text-sm text-gray-500">
                        Currently on Leave
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CalendarCheckIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.monthlyApproved}
                      </p>
                      <p className="text-sm text-gray-500">
                        Approved This Month
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalApproved}
                      </p>
                      <p className="text-sm text-gray-500">Total Approved</p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircleIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.rejected}
                      </p>
                      <p className="text-sm text-gray-500">Rejected</p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <RotateCcwIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.returned}
                      </p>
                      <p className="text-sm text-gray-500">Returned</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Pending Final Approval
                  </h2>
                  {pendingRequests.length > 0 &&
                <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
                      {pendingRequests.length} awaiting HR approval
                    </span>
                }
                </div>
                <PendingRequestsTable
                requests={pendingRequests}
                onViewRequest={handleViewRequest} />

              </Card>

              {employeesOnLeave.length > 0 &&
            <Card>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Employees Currently on Leave
                  </h2>
                  <div className="space-y-3">
                    {employeesOnLeave.map((request) =>
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

                        <div>
                          <p className="font-medium text-gray-900">
                            {request.employeeName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {request.leaveType} •{' '}
                            {new Date(request.startDate).toLocaleDateString()} -{' '}
                            {new Date(request.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          On Leave
                        </span>
                      </div>
                )}
                  </div>
                </Card>
            }
            </motion.div>
          }

          {activeView === 'pending' &&
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.3
            }}>

              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    All Pending HR Approval
                  </h2>
                  <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
                    {pendingRequests.length} total
                  </span>
                </div>
                <PendingRequestsTable
                requests={pendingRequests}
                onViewRequest={handleViewRequest} />

              </Card>
            </motion.div>
          }
        </main>
      </div>

      <RequestDetailModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        onReturn={handleReturn}
        role={user.role} />

    </div>);

}
