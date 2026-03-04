
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboardIcon,
  FileTextIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  RotateCcwIcon } from
'lucide-react';
import { Sidebar } from '../components/ui/Sidebar';
import { TopBar } from '../components/ui/TopBar';
import { Card } from '../components/ui/Card';
import { LeaveRequestForm } from '../components/LeaveRequestForm';
import { MyRequestsTable } from '../components/MyRequestsTable';
import { RequestDetailModal } from '../components/RequestDetailModal';

const sidebarItems = [
{
  icon: <LayoutDashboardIcon className="w-5 h-5" />,
  label: 'Dashboard',
  key: 'dashboard'
},
{
  icon: <FileTextIcon className="w-5 h-5" />,
  label: 'My Requests',
  key: 'my-requests'
}];


export function EmployeeDashboard({
  user,
  requests,
  onLogout,
  onSubmitRequest
}) {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myRequests = requests.filter((r) => r.employeeId === user.id);

  const stats = {
    total: myRequests.length,
    pending: myRequests.filter(
      (r) => r.status === 'pending-manager' || r.status === 'pending-hr'
    ).length,
    approved: myRequests.filter((r) => r.status === 'approved').length,
    rejected: myRequests.filter((r) => r.status === 'rejected').length,
    returned: myRequests.filter((r) => r.status === 'returned').length
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleEditRequest = (request) => {
    console.log('Edit request:', request.id);
  };

  return (
    <div className="min-h-screen flex gap-0 bg-gray-50">
      <Sidebar
        items={sidebarItems}
        activeItem={activeView}
        onItemClick={setActiveView}
        userName={user.name}
        userRole={user.role}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} />


      <div className=" w-full ">
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

              <div className=" grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </p>
                      <p className="text-sm text-gray-500">Total Requests</p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <ClockIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.pending}
                      </p>
                      <p className="text-sm text-gray-500">Pending</p>
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
                        {stats.approved}
                      </p>
                      <p className="text-sm text-gray-500">Approved</p>
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

                <Card padding="md" className="col-span-2 lg:col-span-1">
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

              <LeaveRequestForm onSubmit={onSubmitRequest} />
            </motion.div>
          }

          {activeView === 'my-requests' &&
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  My Leave Requests
                </h2>
                <MyRequestsTable
                requests={myRequests}
                onView={handleViewRequest}
                onEdit={handleEditRequest} />

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
        onApprove={() => {}}
        onReject={() => {}}
        onReturn={() => {}}
        role={user.role} />

    </div>);

}
