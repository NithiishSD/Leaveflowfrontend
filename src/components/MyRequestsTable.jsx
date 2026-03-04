
import React from 'react';
import { Table } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { EyeIcon, EditIcon } from 'lucide-react';

export function MyRequestsTable({ requests, onView, onEdit }) {
  const formatDateRange = (start, end) => {
    const startDate = new Date(start).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const endDate = new Date(end).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `${startDate} - ${endDate}`;
  };

  const columns = [
  {
    key: 'id',
    header: 'Request ID',
    render: (request) =>
    <span className="font-medium text-gray-900">{request.id}</span>

  },
  {
    key: 'leaveType',
    header: 'Leave Type',
    render: (request) =>
    <span className="text-gray-700">{request.leaveType}</span>

  },
  {
    key: 'dateRange',
    header: 'Date Range',
    render: (request) =>
    <span className="text-gray-600">
          {formatDateRange(request.startDate, request.endDate)}
        </span>

  },
  {
    key: 'status',
    header: 'Status',
    render: (request) => <Badge status={request.status} />
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (request) =>
    <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onView(request)}>
            <EyeIcon className="w-4 h-4 mr-1" />
            View
          </Button>
          {request.status === 'returned' &&
      <Button variant="ghost" size="sm" onClick={() => onEdit(request)}>
              <EditIcon className="w-4 h-4 mr-1" />
              Edit
            </Button>
      }
        </div>

  }];


  return (
    <Table
      columns={columns}
      data={requests}
      keyExtractor={(request) => request.id}
      emptyMessage="No leave requests yet. Submit your first request above!" />);


}