"use client"

import { useState } from "react"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/layout"
import CalendarPage from "./pages/CalendarPage"
import ServicePage from "./pages/ServicePage"
import ReportsPage from "./pages/ReportsPage"
import "./App.css"

function App() {
  const [agendamentos, setAgendamentos] = useState([])
  const [activePage, setActivePage] = useState("services") // Ou "reports"

  const renderPage = () => {
    switch (activePage) {
      case "calendar":
        return <CalendarPage setAgendamentos={setAgendamentos} />
      case "services":
        return <ServicePage agendamentos={agendamentos} setAgendamentos={setAgendamentos} />
      case "reports":
        return <ReportsPage agendamentos={agendamentos} />
      default:
        return <CalendarPage setAgendamentos={setAgendamentos} />
    }
  }

  return (
    <ThemeProvider>
      <Layout activePage={activePage} setActivePage={setActivePage}>
        {renderPage()}
        {Array.isArray(agendamentos) && agendamentos.map((atendimento, index) => (
          <tr key={index}>
            {/* Renderização do atendimento */}
          </tr>
        ))}
        {!Array.isArray(agendamentos) || agendamentos.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Nenhum dado disponível para gerar relatórios.
          </div>
        ) : null}
      </Layout>
    </ThemeProvider>
  )
}

export default App
