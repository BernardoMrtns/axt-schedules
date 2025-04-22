"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

function ReportsPage({ agendamentos }) {
  const [reportType, setReportType] = useState("tecnico")

  // Dados para o gráfico por técnico
  const getTecnicoData = () => {
    const tecnicoCount = {}
    agendamentos.forEach((atendimento) => {
      tecnicoCount[atendimento.tecnico] = (tecnicoCount[atendimento.tecnico] || 0) + 1
    })

    return Object.keys(tecnicoCount).map((tecnico) => ({
      name: tecnico,
      atendimentos: tecnicoCount[tecnico],
    }))
  }

  // Dados para o gráfico por cidade
  const getCidadeData = () => {
    const cidadeCount = {}
    agendamentos.forEach((atendimento) => {
      cidadeCount[atendimento.cidade] = (cidadeCount[atendimento.cidade] || 0) + 1
    })

    return Object.keys(cidadeCount).map((cidade) => ({
      name: cidade,
      atendimentos: cidadeCount[cidade],
    }))
  }

  // Dados para o gráfico por tipo (servidor ou não)
  const getTipoData = () => {
    let servidorCount = 0
    let normalCount = 0

    agendamentos.forEach((atendimento) => {
      if (atendimento.isServidor) {
        servidorCount++
      } else {
        normalCount++
      }
    })

    return [
      { name: "Servidor", value: servidorCount },
      { name: "Normal", value: normalCount },
    ]
  }

  // Cores para o gráfico de pizza
  const COLORS = ["#0088FE", "#00C49F"]

  // Renderiza o gráfico apropriado com base no tipo selecionado
  const renderChart = () => {
    if (agendamentos.length === 0) {
      return (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
          Nenhum dado disponível para gerar relatórios.
        </div>
      )
    }

    switch (reportType) {
      case "tecnico":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getTecnicoData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg, #fff)",
                  color: "var(--tooltip-color, #333)",
                  border: "var(--tooltip-border, 1px solid #ccc)",
                }}
              />
              <Legend />
              <Bar dataKey="atendimentos" fill="#3B82F6" name="Atendimentos" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "cidade":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getCidadeData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg, #fff)",
                  color: "var(--tooltip-color, #333)",
                  border: "var(--tooltip-border, 1px solid #ccc)",
                }}
              />
              <Legend />
              <Bar dataKey="atendimentos" fill="#10B981" name="Atendimentos" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "tipo":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={getTipoData()}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {getTipoData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg, #fff)",
                  color: "var(--tooltip-color, #333)",
                  border: "var(--tooltip-border, 1px solid #ccc)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white transition-colors duration-200">
            Relatórios
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Visualize estatísticas dos atendimentos
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <label
              htmlFor="reportType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200"
            >
              Tipo de Relatório
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="block w-full max-w-xs border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            >
              <option value="tecnico">Por Técnico</option>
              <option value="cidade">Por Cidade</option>
              <option value="tipo">Por Tipo (Servidor/Normal)</option>
            </select>
          </div>
          <div className="mt-4">{renderChart()}</div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
