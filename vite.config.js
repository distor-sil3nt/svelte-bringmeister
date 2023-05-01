import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import istanbul from 'vite-plugin-istanbul';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true
	},
	plugins: [
		sveltekit(),
		istanbul({
			include: ['src/*'],
			exclude: ['node_modules', 'test/'],
			extension: ['.ts', '.svelte'],
			all: true,
			checkCoverage: true,
			reporter: ['lcov'],
			reportDir: './tests/coverage',
			requireEnv: false,
			forceBuildInstrument: true
		}),
		svg()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
