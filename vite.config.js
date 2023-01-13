import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	preview:{
		port:80
	},
	plugins: [sveltekit()]
};

export default config;
