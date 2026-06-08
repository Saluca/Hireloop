export type Status = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  dateApplied: string;
  status: Status;
  description: string;
}
