import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@img': path.resolve(__dirname, './src/img'),
		},
	},
});