"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, AlertCircle, Check, X } from "lucide-react"
import api from "../services/api"; // Corrija o caminho para o arquivo correto

function ServicePage({ agendamentos, setAgendamentos }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)
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

  const handleDelete = (index) => {
    if (confirm("Tem certeza que deseja excluir este atendimento?")) {
      const updatedAgendamentos = agendamentos.filter((_, i) => i !== index)
      setAgendamentos(updatedAgendamentos)
    }
  }

  const handleEdit = (index) => {
    setEditData({ ...agendamentos[index], index })
    setIsEditModalOpen(true)
    setFormError("")
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const updatedAgendamentos = [...agendamentos]
    updatedAgendamentos[editData.index] = editData
    setAgendamentos(updatedAgendamentos)
    setIsEditModalOpen(false)
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white transition-colors duration-200">
            Atendimentos
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Lista de todos os atendimentos agendados
          </p>
        </div>
        <div className="overflow-x-auto">
          {agendamentos.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Nenhum atendimento agendado ainda.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
              <thead className="bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Número WOT / Atendimento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Técnico
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Cidade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Servidor (SVD)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Pagamento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
                {agendamentos.map((atendimento, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white transition-colors duration-200">
                      {new Date(atendimento.selectedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white transition-colors duration-200">
                      {atendimento.atendimentoInfo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white transition-colors duration-200">
                      {atendimento.tecnico}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white transition-colors duration-200">
                      {atendimento.cidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white transition-colors duration-200">
                      {atendimento.isServidor ? "Sim" : "Não"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white transition-colors duration-200">
                      R$ {atendimento.pagamento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3 transition-colors duration-200"
                      >
                        <Edit2 className="h-5 w-5" />
                        <span className="sr-only">Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Excluir</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
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
                      Editar Atendimento
                    </h3>
                    <div className="mt-4">
                      {formError && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md flex items-start transition-colors duration-200">
                          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}
                      <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="edit-atendimentoInfo"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Número WOT / Atendimento
                          </label>
                          <input
                            type="text"
                            name="atendimentoInfo"
                            id="edit-atendimentoInfo"
                            value={editData?.atendimentoInfo || ""}
                            onChange={handleEditChange}
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-tecnico"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Técnico
                          </label>
                          <select
                            name="tecnico"
                            id="edit-tecnico"
                            value={editData?.tecnico || ""}
                            onChange={handleEditChange}
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
                            htmlFor="edit-cidade"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Cidade
                          </label>
                          <input
                            type="text"
                            name="cidade"
                            id="edit-cidade"
                            value={editData?.cidade || ""}
                            onChange={handleEditChange}
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="isServidor"
                            id="edit-isServidor"
                            checked={editData?.isServidor || false}
                            onChange={handleEditChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                          />
                          <label
                            htmlFor="edit-isServidor"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Servidor (SVD)
                          </label>
                        </div>
                        <div>
                          <label
                            htmlFor="edit-pagamento"
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
                              id="edit-pagamento"
                              value={editData?.pagamento || ""}
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
                  onClick={handleEditSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
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

export default ServicePage
