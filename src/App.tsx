import { useApplications } from './hooks/useApplications';
import { ApplicationForm } from './components/ApplicationForm';
import { Dashboard } from './components/Dashboard';
import './App.css';

export default function App() {
  const { applications, addApplication, updateStatus, deleteApplication } = useApplications();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hireloop</h1>
        <p className="app-subtitle">Track every application, every step.</p>
      </header>

      <main className="app-main">
        <aside className="form-panel">
          <ApplicationForm onAdd={addApplication} />
        </aside>

        <section className="dashboard-panel">
          <div className="dashboard-heading">
            <h2>Applications</h2>
            <span className="app-count">{applications.length} total</span>
          </div>
          <Dashboard
            applications={applications}
            onUpdateStatus={updateStatus}
            onDelete={deleteApplication}
          />
        </section>
      </main>
    </div>
  );
}
