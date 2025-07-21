import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_EXPRESS_API_URL || 'http://localhost:5000',
          changeOrigin: true,
        }
      }
    },
    preview: {
      proxy: {
        '/api': {
          target: env.VITE_EXPRESS_API_URL || 'http://localhost:5000',
          changeOrigin: true,
        }
      }
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
