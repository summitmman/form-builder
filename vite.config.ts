import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (mode === 'lib') {
    return {
      base: env.BASE_URL,
      plugins: [vue(), dts()],
      build: {
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'summitmman-form-builder',
          fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      }
    };
  } else {
    return {
      base: env.BASE_URL,
      plugins: [vue()],
    };
  }
})
