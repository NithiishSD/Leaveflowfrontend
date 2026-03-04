
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboardIcon,
  ClipboardListIcon,
  ClockIcon,
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


export function ManagerDashboard({
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

  const pendingRequests = requests.filter((r) => r.status === 'pending-manager');

  const stats = {
    pending: pendingRequests.length,
    approvedToday: requests.filter((r) => {
      const today = new Date().toDateString();
      return (
        r.status === 'approved' &&
        new Date(r.updatedAt).toDateString() === today);

    }).length,
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
    <div className="min-h-screen bg-gray-50 flex ">
      <Sidebar
        items={sidebarItems}
        activeItem={activeView}
        onItemClick={setActiveView}
        userName={user.name}
        userRole={user.role}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} />


      <div className="w-full">
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

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ClockIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.pending}
                      </p>
                      <p className="text-sm text-gray-500">Pending Review</p>
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
                        {stats.approvedToday}
                      </p>
                      <p className="text-sm text-gray-500">Approved Today</p>
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
                    Pending Requests
                  </h2>
                  {pendingRequests.length > 0 &&
                <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                      {pendingRequests.length} awaiting review
                    </span>
                }
                </div>
                <PendingRequestsTable
                requests={pendingRequests}
                onViewRequest={handleViewRequest} />

              </Card>
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
                    All Pending Requests
                  </h2>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
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
