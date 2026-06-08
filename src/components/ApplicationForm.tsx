import { useState } from "react";
import type { JobApplication, Status } from "../types";

const STATUSES: Status[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "No Answer",
];

const empty = {
  company: "",
  jobTitle: "",
  dateApplied: "",
  status: "Applied" as Status,
  description: "",
};

interface Props {
  onAdd: (data: Omit<JobApplication, "id">) => void;
}

export function ApplicationForm({ onAdd }: Props) {
  const [form, setForm] = useState(empty);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.company.trim() || !form.jobTitle.trim() || !form.dateApplied)
      return;
    onAdd(form);
    setForm(empty);
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h2>Add Application</h2>

      <div className="form-row">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="e.g. Umbrella Corporation"
          value={form.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          placeholder="e.g. Frontend Engineer"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="dateApplied">Date Applied</label>
        <input
          id="dateApplied"
          name="dateApplied"
          type="date"
          value={form.dateApplied}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Paste the job description or add notes..."
          value={form.description}
          onChange={handleChange}
          rows={5}
        />
      </div>

      <button type="submit" className="btn-primary">
        Add Application
      </button>
    </form>
  );
}
