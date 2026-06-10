import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import type { JobApplication } from '../types'

const noop = () => {}

const apps: JobApplication[] = [
  {
    id: '1',
    company: 'Google',
    jobTitle: 'Software Engineer',
    dateApplied: '2024-01-01',
    status: 'Applied',
    description: '',
  },
  {
    id: '2',
    company: 'Stripe',
    jobTitle: 'Frontend Developer',
    dateApplied: '2024-01-02',
    status: 'Interview',
    description: '',
  },
]

test('shows empty state message when there are no applications', () => {
  render(<Dashboard applications={[]} onUpdateStatus={noop} onDelete={noop} />)
  expect(screen.getByText('No applications yet. Add your first one!')).toBeInTheDocument()
})

test('renders a card for each application', () => {
  render(<Dashboard applications={apps} onUpdateStatus={noop} onDelete={noop} />)
  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.getByText('Stripe')).toBeInTheDocument()
})

test('does not show the empty state when applications exist', () => {
  render(<Dashboard applications={apps} onUpdateStatus={noop} onDelete={noop} />)
  expect(screen.queryByText('No applications yet. Add your first one!')).not.toBeInTheDocument()
})
