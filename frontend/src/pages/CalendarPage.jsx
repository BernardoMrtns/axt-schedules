"use client"

import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import { X, Check, AlertCircle } from "lucide-react"
import "react-calendar/dist/Calendar.css"
import api from "../services/api"; // Certifique-se de que o caminho está correto

const distancias = {
  "TIMOTEO": 94,
  "BELA VISTA DE MINAS": 12,
  "PAULA CANDIDO": 174,
  "SANTO ANTONIO DO GRAMA": 106,
  "MANHUMIRIM": 195,
  "PARAOPEBA": 208,
  "CORREGO FUNDO": 317,
  "SAO JOAO DO MANHUACU": 177,
  "PEQUI": 222,
  "JOAO MONLEVADE": 1,
  "CORONEL FABRICIANO": 88,
  "RIO PIRACICABA": 20,
  "TRES MARIAS": 377,
  "FORMIGA": 309,
  "NOVA SERRANA": 237,
  "SIMONESIA": 205,
  "ANTONIO DIAS": 61,
  "MARAVILHAS": 245,
  "ITABIRA": 36,
  "SGRA": 30,
  "DIVINOPOLIS": 251,
 "MATIPO": 142,
  "SANTA BARBARA": 43,
  "MARIANA": 108,
  "ARCOS": 324,
  "ITAUNA": 192,
  "PAINS": 330,
  "CONCEICAO DO PARA": 244,
  "OURO PRETO": 122,
  "VICOSA": 174,
  "PONTE NOVA": 126,
  "CURVELO": 271,
  "BARAO DE COCAIS": 58,
  "PITANGUI": 237,
  "CAPUTIRA": 160,
  "CAPITOLIO": 391,
  "MANHUACU": 175,
  "LAGOA DA PRATA": 315,
  "BOM SUCESSO": 315,
  "CLAUDIO": 252,
  "IGUATAMA": 346,
  "ALTO JEQUITIBA": 205,
  "CONCEICAO DO MATO DENTRO": 226,
  "BAMBUI": 375,
  "DOM JOAQUIM": 175,
  "SANTANA DO PARAISO": 117,
  "SAO SEBASTIAO DO OESTE": 257,
  "MARTINHO CAMPOS": 311,
  "SANTA MARGARIDA": 152,
  "MARTINS SOARES": 195,
  "PAPAGAIOS": 255,
  "CAETANOPOLIS": 209,
  "SANTANA DO RIACHO": 186,
  "DIVINO": 195,
  "BELO HORIZONTE": 117,
}

function CalendarPage({ setAgendamentos }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    atendimentoInfo: "",
    tecnico: "",
    cidade: "",
    isServidor: false,
    pagamento: "",
  })
  const [formError, setFormError] = useState("")

  useEffect(() => {
    api.get('/agendamentos')
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar agendamentos:", error);
      });
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
    setFormError("")
    setFormData({
      atendimentoInfo: "",
      tecnico: "",
      cidade: "",
      isServidor: false,
      pagamento: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }

    // Atualiza o pagamento automaticamente
    if (name === "cidade" || name === "isServidor") {
      const distancia = distancias[updatedFormData.cidade?.toUpperCase()]
      if (distancia) {
        const valor = calcularValor(distancia, updatedFormData.isServidor)
        updatedFormData.pagamento = valor
      }
    }

    setFormData(updatedFormData)
  }

  const calcularValor = (distancia, isServidor) => {
    const tabela = isServidor
      ? [280, 370, 380, 540, 550, 560, 570, 580, 590, 600, 610, 620]
      : [125, 250, 260, 350, 360, 370, 520, 530, 540, 560, 570, 580]

    if (distancia <= 50) return tabela[0]
    if (distancia <= 100) return tabela[1]
    if (distancia <= 150) return tabela[2]
    if (distancia <= 200) return tabela[3]
    if (distancia <= 250) return tabela[4]
    if (distancia <= 300) return tabela[5]
    if (distancia <= 350) return tabela[6]
    if (distancia <= 400) return tabela[7]
    if (distancia <= 450) return tabela[8]
    if (distancia <= 500) return tabela[9]
    if (distancia <= 550) return tabela[10]
    if (distancia <= 600) return tabela[11]
    return "Fora da tabela"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const distancia = distancias[formData.cidade.toUpperCase()]
    if (!distancia) {
      setFormError("Cidade não encontrada na tabela de distâncias.")
      return
    }

    const valor = calcularValor(distancia, formData.isServidor)
    const novoAtendimento = {
      ...formData,
      selectedDate,
      pagamento: valor,
    }

    setAgendamentos((prev) => [...prev, novoAtendimento])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white transition-colors duration-200">
            Calendário de Agendamentos
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Selecione uma data para agendar um novo atendimento
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <Calendar
            className="custom-calendar mx-auto"
            onClickDay={handleDateClick}
            tileClassName={({ date }) => {
              const start = new Date(2025, 0, 23)
              const end = new Date(2025, 1, 22)
              if (date >= start && date <= end) {
                return "highlight"
              }
            }}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white transition-colors duration-200">
                      Preencher Atendimento
                    </h3>
                    <div className="mt-4">
                      {formError && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md flex items-start transition-colors duration-200">
                          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="atendimentoInfo"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Número WOT / Atendimento
                          </label>
                          <input
                            type="text"
                            name="atendimentoInfo"
                            id="atendimentoInfo"
                            value={formData.atendimentoInfo}
                            onChange={handleInputChange}
                            placeholder="Ex: WOT123/456"
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Data
                          </label>
                          <input
                            type="text"
                            id="date"
                            value={selectedDate?.toLocaleDateString()}
                            readOnly
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white sm:text-sm transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="tecnico"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Técnico
                          </label>
                          <select
                            name="tecnico"
                            id="tecnico"
                            value={formData.tecnico}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          >
                            <option value="">Selecione</option>
                            <option value="HIAGO">HIAGO</option>
                            <option value="BERNARDO">BERNARDO</option>
                            <option value="LUCIO">LUCIO</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="cidade"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Cidade
                          </label>
                          <input
                            type="text"
                            name="cidade"
                            id="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="isServidor"
                            id="isServidor"
                            checked={formData.isServidor}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                          />
                          <label
                            htmlFor="isServidor"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Servidor (SVD)
                          </label>
                        </div>
                        <div>
                          <label
                            htmlFor="pagamento"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Pagamento
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 dark:text-gray-400 sm:text-sm transition-colors duration-200">
                                R$
                              </span>
                            </div>
                            <input
                              type="text"
                              name="pagamento"
                              id="pagamento"
                              value={formData.pagamento}
                              readOnly
                              className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white sm:text-sm transition-colors duration-200"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarPage
