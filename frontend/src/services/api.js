import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Certifique-se de que o backend está rodando nesta URL
});

export default api; // Exportação padrão
