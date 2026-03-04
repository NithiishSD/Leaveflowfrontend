
import React from 'react';
import { Table } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { EyeIcon } from 'lucide-react';

export function PendingRequestsTable({ requests, onViewRequest }) {
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
    key: 'employeeName',
    header: 'Employee',
    render: (request) =>
    <div>
          <p className="font-medium text-gray-900">{request.employeeName}</p>
          <p className="text-xs text-gray-500">{request.id}</p>
        </div>

  },
  {
    key: 'leaveType',
    header: 'Leave Type',
    render: (request) =>
    <span className="text-gray-700">{request.leaveType}</span>

  },
  {
    key: 'dates',
    header: 'Dates',
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
    <Button
      variant="primary"
      size="sm"
      onClick={() => onViewRequest(request)}>

          <EyeIcon className="w-4 h-4 mr-1" />
          View
        </Button>

  }];


  return (
    <Table
      columns={columns}
      data={requests}
      keyExtractor={(request) => request.id}
      emptyMessage="No pending requests at this time." />);


}