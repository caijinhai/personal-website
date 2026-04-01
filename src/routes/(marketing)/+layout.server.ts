import { env } from '$env/dynamic/public';

export const load = async () => {
	return {
		supabaseUrl: env.PUBLIC_SUPABASE_URL,
		supabaseAnonKey: env.PUBLIC_SUPABASE_ANON_KEY
	};
};
