import type { JobApplication, Status } from '../types';

const STATUSES: Status[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

interface Props {
  application: JobApplication;
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, onUpdateStatus, onDelete }: Props) {
  const { id, company, jobTitle, dateApplied, status, description } = application;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{jobTitle}</h3>
          <p className="card-company">{company}</p>
        </div>
        <button
          className="btn-delete"
          onClick={() => onDelete(id)}
          aria-label="Delete application"
        >
          ✕
        </button>
      </div>

      <p className="card-date">Applied: {new Date(dateApplied + 'T00:00:00').toLocaleDateString()}</p>

      {description && (
        <p className="card-description">{description}</p>
      )}

      <div className="card-footer">
        <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>
        <select
          className="status-select"
          value={status}
          onChange={e => onUpdateStatus(id, e.target.value as Status)}
          aria-label="Update status"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
