
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { FileUpload } from './ui/FileUpload';
import { CheckIcon, AlertTriangleIcon } from 'lucide-react';

const leaveTypeOptions = [
{
  value: 'Vacation',
  label: 'Vacation'
},
{
  value: 'Medical',
  label: 'Medical'
},
{
  value: 'Emergency',
  label: 'Emergency'
}];


export function LeaveRequestForm({ onSubmit }) {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [documents, setDocuments] = useState([]);
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiresDocuments = leaveType === 'Medical' || leaveType === 'Emergency';

  const validate = () => {
    const newErrors = {};

    if (!leaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!reason) {
      newErrors.reason = 'Reason is required';
    } else if (reason.length < 20) {
      newErrors.reason = 'Reason must be at least 20 characters';
    }
    if (requiresDocuments && documents.length === 0) {
      newErrors.documents =
      'Documents are required for Medical and Emergency leave';
    }
    if (!signatureConfirmed) {
      newErrors.signatureConfirmed =
      'You must confirm the information is accurate';
    }
    if (!signatureName.trim()) {
      newErrors.signatureName = 'Please type your full name as signature';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit({
      leaveType,
      startDate,
      endDate,
      reason,
      documents,
      signatureConfirmed,
      signatureName
    });

    setIsSubmitting(false);
    handleReset();
  };

  const handleReset = () => {
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setDocuments([]);
    setSignatureConfirmed(false);
    setSignatureName('');
    setErrors({});
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        New Leave Request
      </h2>

      <div className="space-y-6">
        <Select
          label="Leave Type"
          options={leaveTypeOptions}
          value={leaveType}
          onChange={setLeaveType}
          error={errors.leaveType}
          required
          placeholder="Select leave type" />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={setStartDate}
            error={errors.startDate}
            required />

          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={setEndDate}
            error={errors.endDate}
            required />

        </div>

        <Textarea
          label="Reason"
          placeholder="Please provide a detailed reason for your leave request (minimum 20 characters)"
          value={reason}
          onChange={setReason}
          error={errors.reason}
          required
          rows={4} />


        <FileUpload
          label="Supporting Documents"
          files={documents}
          onFilesChange={setDocuments}
          note={
          requiresDocuments ?
          'Required for Medical & Emergency leave' :
          undefined
          }
          error={errors.documents}
          required={requiresDocuments} />


        <Card className="bg-gray-50 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Digital Signature
          </h3>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={signatureConfirmed}
                  onChange={(e) => setSignatureConfirmed(e.target.checked)}
                  className="sr-only peer" />

                <div
                  className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  transition-colors duration-200
                  ${signatureConfirmed ? 'bg-blue-600 border-blue-600' : errors.signatureConfirmed ? 'border-red-300' : 'border-gray-300'}
                `}>

                  {signatureConfirmed &&
                  <CheckIcon className="w-3.5 h-3.5 text-white" />
                  }
                </div>
              </div>
              <span className="text-sm text-gray-700">
                I confirm that all information provided in this leave request is
                accurate and complete.
              </span>
            </label>
            {errors.signatureConfirmed &&
            <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangleIcon className="w-4 h-4" />
                {errors.signatureConfirmed}
              </p>
            }

            <Input
              label="Type your full name as signature"
              placeholder="Enter your full name"
              value={signatureName}
              onChange={setSignatureName}
              error={errors.signatureName}
              required />

          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
            className="flex-1 sm:flex-none">

            Submit Request
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting}>

            Reset Form
          </Button>
        </div>
      </div>
    </Card>);

}