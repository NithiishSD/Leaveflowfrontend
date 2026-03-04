
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Card } from './ui/Card';
import {
  CalendarIcon,
  FileTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  FileIcon,
  UserIcon,
  ClockIcon } from
'lucide-react';

export function RequestDetailModal({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onReturn,
  role
}) {
  const [actionType, setActionType] = useState(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');

  if (!request) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleAction = () => {
    if (actionType === 'approve') {
      onApprove(request.id, comment || undefined);
      handleClose();
    } else if (actionType === 'reject') {
      if (!comment.trim()) {
        setCommentError('Please provide a reason for rejection');
        return;
      }
      onReject(request.id, comment);
      handleClose();
    } else if (actionType === 'return') {
      if (!comment.trim()) {
        setCommentError('Please specify what needs to be fixed');
        return;
      }
      onReturn(request.id, comment);
      handleClose();
    }
  };

  const handleClose = () => {
    setActionType(null);
    setComment('');
    setCommentError('');
    onClose();
  };

  const canTakeAction =
  role === 'manager' && request.status === 'pending-manager' ||
  role === 'hr' && request.status === 'pending-hr';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Leave Request Details"
      size="lg">

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {request.employeeName}
            </h3>
            <p className="text-sm text-gray-500">{request.id}</p>
          </div>
          <Badge status={request.status} size="md" />
        </div>

        <Card className="bg-gray-50 border-gray-200" padding="md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileTextIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Leave Type
                </p>
                <p className="font-medium text-gray-900">{request.leaveType}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Duration
                </p>
                <p className="font-medium text-gray-900">
                  {formatDate(request.startDate)}
                </p>
                <p className="text-sm text-gray-600">
                  to {formatDate(request.endDate)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Reason</h4>
          <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
            {request.reason}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Supporting Documents ({request.documents.length})
          </h4>
          {request.documents.length > 0 ?
          <div className="space-y-2">
              {request.documents.map((doc) =>
            <div
              key={doc.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">

                  <FileIcon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(doc.size)}
                    </p>
                  </div>
                </div>
            )}
            </div> :

          <p className="text-gray-500 text-sm bg-gray-50 rounded-lg p-4">
              No documents uploaded
            </p>
          }
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Signature Verification
          </h4>
          <Card
            className={`${request.signatureConfirmed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            padding="sm">

            <div className="flex items-center gap-3">
              {request.signatureConfirmed ?
              <CheckCircleIcon className="w-5 h-5 text-green-600" /> :

              <XCircleIcon className="w-5 h-5 text-red-600" />
              }
              <div>
                <p
                  className={`font-medium ${request.signatureConfirmed ? 'text-green-700' : 'text-red-700'}`}>

                  {request.signatureConfirmed ? 'Verified' : 'Not Verified'}
                </p>
                {request.signatureName &&
                <p className="text-sm text-gray-600">
                    Signed as: {request.signatureName}
                  </p>
                }
              </div>
            </div>
          </Card>
        </div>

        {request.comments.length > 0 &&
        <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Comments History
            </h4>
            <div className="space-y-3">
              {request.comments.map((cmt) =>
            <div key={cmt.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {cmt.authorName}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      ({cmt.authorRole})
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{cmt.content}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <ClockIcon className="w-3 h-3" />
                    {new Date(cmt.createdAt).toLocaleString()}
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {canTakeAction &&
        <div className="border-t border-gray-200 pt-6">
            {actionType ?
          <div className="space-y-4">
                <Textarea
              label={
              actionType === 'approve' ?
              'Add a comment (optional)' :
              actionType === 'reject' ?
              'Reason for rejection' :
              'What needs to be fixed?'
              }
              placeholder={
              actionType === 'approve' ?
              'Add any notes for the employee...' :
              actionType === 'reject' ?
              'Please explain why this request is being rejected...' :
              'Please specify what information or documents need to be corrected...'
              }
              value={comment}
              onChange={setComment}
              error={commentError}
              required={actionType !== 'approve'}
              rows={3} />

                <div className="flex gap-3">
                  <Button
                variant={
                actionType === 'approve' ?
                'success' :
                actionType === 'reject' ?
                'danger' :
                'warning'
                }
                onClick={handleAction}>

                    Confirm{' '}
                    {actionType === 'approve' ?
                'Approval' :
                actionType === 'reject' ?
                'Rejection' :
                'Return'}
                  </Button>
                  <Button
                variant="secondary"
                onClick={() => {
                  setActionType(null);
                  setComment('');
                  setCommentError('');
                }}>

                    Cancel
                  </Button>
                </div>
              </div> :

          <div className="flex flex-wrap gap-3">
                <Button
              variant="success"
              onClick={() => setActionType('approve')}>

                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
              variant="danger"
              onClick={() => setActionType('reject')}>

                  <XCircleIcon className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
              variant="warning"
              onClick={() => setActionType('return')}>

                  Return for Fixes
                </Button>
              </div>
          }
          </div>
        }
      </div>
    </Modal>);

}