// @ts-nocheck
import * as v from 'vite';
import * as vp from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react';

export default v.defineConfig({
  plugins: [react(), vp.nodePolyfills()],
  base: './',
  define: {'process.env': {}},
})