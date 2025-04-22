import { useState } from 'react';

function ServicePage({ agendamentos, setAgendamentos }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleDelete = (index) => {
    const updatedAgendamentos = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(updatedAgendamentos);
  };

  const handleEdit = (index) => {
    setEditData({ ...agendamentos[index], index });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedAgendamentos = [...agendamentos];
    updatedAgendamentos[editData.index] = editData;
    setAgendamentos(updatedAgendamentos);
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h2>Atendimentos</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Número WOT / Atendimento</th>
            <th>Técnico</th>
            <th>Cidade</th>
            <th>Servidor (SVD)</th>
            <th>Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((atendimento, index) => (
            <tr key={index}>
              <td>{new Date(atendimento.selectedDate).toLocaleDateString()}</td>
              <td>{atendimento.atendimentoInfo}</td>
              <td>{atendimento.tecnico}</td>
              <td>{atendimento.cidade}</td>
              <td>{atendimento.isServidor ? 'Sim' : 'Não'}</td>
              <td>R$ {atendimento.pagamento}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Atendimento</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Número WOT / Atendimento:
                <input
                  type="text"
                  name="atendimentoInfo"
                  value={editData.atendimentoInfo}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label>
                Técnico:
                <select
                  name="tecnico"
                  value={editData.tecnico}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="HIAGO">HIAGO</option>
                  <option value="BERNARDO">BERNARDO</option>
                  <option value="LUCIO">LUCIO</option>
                </select>
              </label>
              <label>
                Cidade:
                <input
                  type="text"
                  name="cidade"
                  value={editData.cidade}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label>
                Servidor (SVD):
                <input
                  type="checkbox"
                  name="isServidor"
                  checked={editData.isServidor}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Pagamento:
                <input
                  type="text"
                  name="pagamento"
                  value={editData.pagamento}
                  readOnly
                />
              </label>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicePage;