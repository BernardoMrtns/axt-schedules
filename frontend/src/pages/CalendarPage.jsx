import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css'; // Ensure this is imported after react-calendar styles

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
  "BELO HORIZONTE": 117
};

function CalendarPage({ setAgendamentos }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState('Calendário'); // State to manage active tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    atendimentoInfo: '', // Combina Número WOT e Número do Atendimento
    tecnico: '',
    cidade: '',
    isServidor: false,
    pagamento: '',
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true); // Abre o modal
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    // Atualiza o pagamento automaticamente
    if (name === 'cidade' || name === 'isServidor') {
      const distancia = distancias[updatedFormData.cidade?.toUpperCase()];
      if (distancia) {
        const valor = calcularValor(distancia, updatedFormData.isServidor);
        updatedFormData.pagamento = valor;
      }
    }

    setFormData(updatedFormData);
  };

  const calcularValor = (distancia, isServidor) => {
    const tabela = isServidor
      ? [280, 370, 380, 540, 550, 560, 570, 580, 590, 600, 610, 620]
      : [125, 250, 260, 350, 360, 370, 520, 530, 540, 560, 570, 580];

    if (distancia <= 50) return tabela[0];
    if (distancia <= 100) return tabela[1];
    if (distancia <= 150) return tabela[2];
    if (distancia <= 200) return tabela[3];
    if (distancia <= 250) return tabela[4];
    if (distancia <= 300) return tabela[5];
    if (distancia <= 350) return tabela[6];
    if (distancia <= 400) return tabela[7];
    if (distancia <= 450) return tabela[8];
    if (distancia <= 500) return tabela[9];
    if (distancia <= 550) return tabela[10];
    if (distancia <= 600) return tabela[11];
    return 'Fora da tabela';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const distancia = distancias[formData.cidade.toUpperCase()];
    if (!distancia) {
      alert('Cidade não encontrada na tabela de distâncias.');
      return;
    }

    const valor = calcularValor(distancia, formData.isServidor);
    const novoAtendimento = {
      ...formData,
      selectedDate,
      pagamento: valor,
    };

    setAgendamentos((prev) => [...prev, novoAtendimento]); // Atualiza os agendamentos no App
    setIsModalOpen(false); // Fecha o modal
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Calendário':
        return (
          <div className="calendar-container">
            <h2>Calendário de Agendamentos</h2>
            <Calendar
              className="custom-calendar"
              onClickDay={handleDateClick}
              tileClassName={({ date }) => {
                const start = new Date(2025, 0, 23);
                const end = new Date(2025, 1, 22);
                if (date >= start && date <= end) {
                  return 'highlight';
                }
              }}
            />
          </div>
        );
      case 'Atendimentos':
        return <div className="tab-content">Conteúdo de Atendimentos</div>;
      case 'Relatórios':
        return <div className="tab-content">Conteúdo de Relatórios</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'Calendário' ? 'active' : ''}
          onClick={() => setActiveTab('Calendário')}
        >
          Calendário
        </button>
        <button
          className={activeTab === 'Atendimentos' ? 'active' : ''}
          onClick={() => setActiveTab('Atendimentos')}
        >
          Atendimentos
        </button>
        <button
          className={activeTab === 'Relatórios' ? 'active' : ''}
          onClick={() => setActiveTab('Relatórios')}
        >
          Relatórios
        </button>
      </div>
      {renderContent()}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Preencher Atendimento</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Número WOT / Atendimento:
                <input
                  type="text"
                  name="atendimentoInfo"
                  value={formData.atendimentoInfo}
                  onChange={handleInputChange}
                  placeholder="Ex: WOT123/456"
                  required
                />
              </label>
              <label>
                Data:
                <input
                  type="text"
                  value={selectedDate?.toLocaleDateString()}
                  readOnly
                />
              </label>
              <label>
                Técnico:
                <select
                  name="tecnico"
                  value={formData.tecnico}
                  onChange={handleInputChange}
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
                  value={formData.cidade}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Servidor (SVD):
                <input
                  type="checkbox"
                  name="isServidor"
                  checked={formData.isServidor}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Pagamento:
                <input
                  type="text"
                  name="pagamento"
                  value={formData.pagamento}
                  readOnly
                />
              </label>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
