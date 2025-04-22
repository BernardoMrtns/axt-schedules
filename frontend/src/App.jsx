import { useEffect } from 'react';
import { api } from './services/api';

function App() {
  useEffect(() => {
    api.get('/')
      .then((res) => {
        console.log('API OK:', res.data);
      })
      .catch((err) => {
        console.error('Erro na API:', err);
      });
  }, []);

  return (
    <div>
      <h1>Agendamentos AXT</h1>
      <p>Aplicação conectada ao backend!</p>
    </div>
  );
}

export default App;
