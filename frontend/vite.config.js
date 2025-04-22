import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["recharts", "lucide-react"],
  },
  server: {
    port: 5173, // Certifique-se de que a porta está disponível
  },
})
