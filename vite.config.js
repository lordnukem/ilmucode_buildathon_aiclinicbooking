import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ilmucode_buildathon_aiclinicbooking/',
  plugins: [react()],
});
