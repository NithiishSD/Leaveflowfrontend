
export const mockUsers = [
{
  id: 'emp-001',
  name: 'John Employee',
  email: 'john.employee@company.com',
  role: 'employee',
  department: 'Engineering'
},
{
  id: 'mgr-001',
  name: 'Sarah Manager',
  email: 'sarah.manager@company.com',
  role: 'manager',
  department: 'Engineering'
},
{
  id: 'hr-001',
  name: 'Alex HR',
  email: 'alex.hr@company.com',
  role: 'hr',
  department: 'Human Resources'
}];


export const mockLeaveRequests = [
{
  id: 'LR-2024-001',
  employeeId: 'emp-001',
  employeeName: 'John Employee',
  leaveType: 'Vacation',
  startDate: '2024-03-15',
  endDate: '2024-03-22',
  reason:
  'Family vacation to Hawaii. Planning to spend quality time with family during spring break.',
  status: 'approved',
  documents: [],
  signatureConfirmed: true,
  signatureName: 'John Employee',
  comments: [
  {
    id: 'cmt-001',
    authorId: 'mgr-001',
    authorName: 'Sarah Manager',
    authorRole: 'manager',
    content: 'Approved. Enjoy your vacation!',
    createdAt: '2024-03-01T10:30:00Z'
  }],

  createdAt: '2024-02-28T09:00:00Z',
  updatedAt: '2024-03-01T10:30:00Z'
},
{
  id: 'LR-2024-002',
  employeeId: 'emp-001',
  employeeName: 'John Employee',
  leaveType: 'Medical',
  startDate: '2024-04-05',
  endDate: '2024-04-08',
  reason:
  'Scheduled surgery and recovery time. Doctor has recommended 4 days of rest post-procedure.',
  status: 'pending-manager',
  documents: [
  {
    id: 'doc-001',
    name: 'medical_certificate.pdf',
    size: 245000,
    type: 'application/pdf',
    uploadedAt: '2024-03-25T14:00:00Z'
  }],

  signatureConfirmed: true,
  signatureName: 'John Employee',
  comments: [],
  createdAt: '2024-03-25T14:00:00Z',
  updatedAt: '2024-03-25T14:00:00Z'
},
{
  id: 'LR-2024-003',
  employeeId: 'emp-001',
  employeeName: 'John Employee',
  leaveType: 'Emergency',
  startDate: '2024-02-10',
  endDate: '2024-02-12',
  reason:
  'Family emergency - need to travel urgently to attend to a family matter.',
  status: 'rejected',
  documents: [
  {
    id: 'doc-002',
    name: 'emergency_proof.pdf',
    size: 128000,
    type: 'application/pdf',
    uploadedAt: '2024-02-09T08:00:00Z'
  }],

  signatureConfirmed: true,
  signatureName: 'John Employee',
  comments: [
  {
    id: 'cmt-002',
    authorId: 'mgr-001',
    authorName: 'Sarah Manager',
    authorRole: 'manager',
    content:
    'Unfortunately, we have a critical deadline during this period. Please reschedule if possible.',
    createdAt: '2024-02-09T12:00:00Z'
  }],

  createdAt: '2024-02-09T08:00:00Z',
  updatedAt: '2024-02-09T12:00:00Z'
},
{
  id: 'LR-2024-004',
  employeeId: 'emp-001',
  employeeName: 'John Employee',
  leaveType: 'Vacation',
  startDate: '2024-05-01',
  endDate: '2024-05-03',
  reason: 'Short trip for a long weekend getaway.',
  status: 'returned',
  documents: [],
  signatureConfirmed: true,
  signatureName: 'John Employee',
  comments: [
  {
    id: 'cmt-003',
    authorId: 'mgr-001',
    authorName: 'Sarah Manager',
    authorRole: 'manager',
    content:
    'Please provide more details about your travel plans and ensure handover is complete.',
    createdAt: '2024-04-20T09:00:00Z'
  }],

  createdAt: '2024-04-18T11:00:00Z',
  updatedAt: '2024-04-20T09:00:00Z'
},
{
  id: 'LR-2024-005',
  employeeId: 'emp-001',
  employeeName: 'John Employee',
  leaveType: 'Vacation',
  startDate: '2024-06-10',
  endDate: '2024-06-14',
  reason:
  'Summer vacation with family. Planning to visit relatives in another state.',
  status: 'pending-hr',
  documents: [],
  signatureConfirmed: true,
  signatureName: 'John Employee',
  comments: [
  {
    id: 'cmt-004',
    authorId: 'mgr-001',
    authorName: 'Sarah Manager',
    authorRole: 'manager',
    content: 'Approved from my end. Forwarding to HR for final approval.',
    createdAt: '2024-05-28T15:00:00Z'
  }],

  createdAt: '2024-05-25T10:00:00Z',
  updatedAt: '2024-05-28T15:00:00Z'
},
{
  id: 'LR-2024-006',
  employeeId: 'emp-002',
  employeeName: 'Emily Developer',
  leaveType: 'Medical',
  startDate: '2024-04-15',
  endDate: '2024-04-17',
  reason: 'Dental surgery and recovery period as advised by dentist.',
  status: 'pending-manager',
  documents: [
  {
    id: 'doc-003',
    name: 'dental_appointment.pdf',
    size: 98000,
    type: 'application/pdf',
    uploadedAt: '2024-04-10T16:00:00Z'
  }],

  signatureConfirmed: true,
  signatureName: 'Emily Developer',
  comments: [],
  createdAt: '2024-04-10T16:00:00Z',
  updatedAt: '2024-04-10T16:00:00Z'
},
{
  id: 'LR-2024-007',
  employeeId: 'emp-003',
  employeeName: 'Michael Designer',
  leaveType: 'Vacation',
  startDate: '2024-04-22',
  endDate: '2024-04-26',
  reason:
  'Attending a design conference in San Francisco and taking a few extra days to explore.',
  status: 'pending-hr',
  documents: [],
  signatureConfirmed: true,
  signatureName: 'Michael Designer',
  comments: [
  {
    id: 'cmt-005',
    authorId: 'mgr-001',
    authorName: 'Sarah Manager',
    authorRole: 'manager',
    content: 'Great opportunity for professional development. Approved.',
    createdAt: '2024-04-12T11:00:00Z'
  }],

  createdAt: '2024-04-08T09:00:00Z',
  updatedAt: '2024-04-12T11:00:00Z'
},
{
  id: 'LR-2024-008',
  employeeId: 'emp-004',
  employeeName: 'Lisa Analyst',
  leaveType: 'Emergency',
  startDate: '2024-04-02',
  endDate: '2024-04-04',
  reason: 'Urgent family matter requiring immediate attention and travel.',
  status: 'pending-manager',
  documents: [
  {
    id: 'doc-004',
    name: 'travel_booking.pdf',
    size: 156000,
    type: 'application/pdf',
    uploadedAt: '2024-04-01T20:00:00Z'
  }],

  signatureConfirmed: true,
  signatureName: 'Lisa Analyst',
  comments: [],
  createdAt: '2024-04-01T20:00:00Z',
  updatedAt: '2024-04-01T20:00:00Z'
}];