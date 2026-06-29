export interface VisitRequest {
  id: string;
  propertyId: string;
  tenantName: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  message?: string;
  rejectionReason?: string;
  rejectionDate?: string;
}
