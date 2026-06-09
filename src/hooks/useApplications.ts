import { useState } from "react";
import type { JobApplication, Status } from "../types";

const STORAGE_KEY = "hireloop_applications";

function load(): JobApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JobApplication[]) : [];
  } catch {
    return [];
  }
}

function save(applications: JobApplication[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export function useApplications() {
  const [applications, setApplications] = useState<JobApplication[]>(load);

  function addApplication(data: Omit<JobApplication, "id">) {
    const next = [{ ...data, id: crypto.randomUUID() }, ...applications];
    setApplications(next);
    save(next);
  }

  function updateStatus(id: string, status: Status) {
    const next = applications.map((a) => (a.id === id ? { ...a, status } : a));
    setApplications(next);
    save(next);
  }

  function deleteApplication(id: string) {
    const next = applications.filter((a) => a.id !== id);
    setApplications(next);
    save(next);
  }

  return { applications, addApplication, updateStatus, deleteApplication };
}
