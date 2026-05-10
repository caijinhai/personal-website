import { createServerClient } from '@supabase/ssr';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

function getSupabaseEnv(event: any): { url: string; anonKey: string } {
	// Cloudflare Pages: secrets 通过 event.platform.env 注入
	// 本地 Node.js 开发: process.env 可用
	const platformEnv = event.platform?.env || {};
	const nodeEnv = (typeof process !== 'undefined' && process.env) || {};

	const env = { ...nodeEnv, ...platformEnv };
	return {
		url: (env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL || '') as string,
		anonKey: (env.SUPABASE_ANON_KEY || env.PUBLIC_SUPABASE_ANON_KEY || '') as string
	};
}

const supabase: Handle = async ({ event, resolve }) => {
	const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = getSupabaseEnv(event);

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		console.error('[hooks] Supabase not configured');
		event.locals.supabase = null;
		event.locals.safeGetSession = async () => ({ session: null, user: null });
		return resolve(event);
	}

	try {
		event.locals.supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
			cookies: {
				getAll: () => event.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, { ...options, path: '/' });
					});
				}
			}
		});

		event.locals.safeGetSession = async () => {
			const {
				data: { session }
			} = await event.locals.supabase.auth.getSession();

			if (!session) {
				return { session: null, user: null };
			}

			const {
				data: { user },
				error
			} = await event.locals.supabase.auth.getUser();

			if (error) {
				return { session: null, user: null };
			}

			return { session, user };
		};
	} catch (e) {
		console.error('Supabase initialization error:', e);
		event.locals.supabase = null;
		event.locals.safeGetSession = async () => ({ session: null, user: null });
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	if (event.locals.safeGetSession) {
		const { session, user } = await event.locals.safeGetSession();
		event.locals.session = session;
		event.locals.user = user;
	}

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
