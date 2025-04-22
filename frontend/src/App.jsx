import { useState } from 'react';
import CalendarPage from './pages/CalendarPage';
import ServicePage from './pages/ServicePage';

function App() {
  const [agendamentos, setAgendamentos] = useState([]);

  return (
    <div>
      <CalendarPage setAgendamentos={setAgendamentos} />
      <ServicePage agendamentos={agendamentos} />
    </div>
  );
}

export default App;
