import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Cloudflare Workers: output SSR di .svelte-kit/cloudflare/_worker.js.
			// wrangler.jsonc harus ikut di-commit supaya `wrangler deploy` tidak
			// menjalankan auto-config yang menimpa script `build` di package.json.
			adapter: adapter()
		})
	]
});
