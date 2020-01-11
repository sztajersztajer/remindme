import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ReminderForm from './pages/ReminderForm'
import Overview from './pages/Overview'
import './index.css';
import { Container } from 'semantic-ui-react'

export default function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={ReminderForm} />
        <Route path="/:id" component={Overview} />
      </Switch>
    </Container>
  )
}
