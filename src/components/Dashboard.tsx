import type { JobApplication, Status } from '../types';
import { ApplicationCard } from './ApplicationCard';

interface Props {
  applications: JobApplication[];
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

export function Dashboard({ applications, onUpdateStatus, onDelete }: Props) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <p>No applications yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      {applications.map(app => (
        <ApplicationCard
          key={app.id}
          application={app}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
