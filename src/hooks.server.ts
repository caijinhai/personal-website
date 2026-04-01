import { createServerClient, isBrowser } from '@supabase/ssr';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const supabase: Handle = async ({ event, resolve }) => {
	const supabaseUrl = env.PUBLIC_SUPABASE_URL || '';
	const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || '';

	if (!supabaseUrl || !supabaseAnonKey) {
		console.error('Missing Supabase environment variables');
		return resolve(event);
	}

	try {
		event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
