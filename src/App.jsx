import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TaskList from './components/TaskList/TaskList'
import './assets/styles/generic/reset.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskList />
  </StrictMode>
)
