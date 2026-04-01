import { sveltekit } from '@sveltejs/kit/vite';
import cloudflare from '@sveltejs/adapter-cloudflare';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
});
