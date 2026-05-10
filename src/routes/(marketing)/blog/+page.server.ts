import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch }) => {
	const SUPABASE_URL = env.PUBLIC_SUPABASE_URL || env.SUPABASE_URL || '';
	const SUPABASE_ANON_KEY = env.PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || '';

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		return { posts: [], configured: false };
	}

	try {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&published=eq.true&order=created_at.desc`, {
			headers: {
				'apikey': SUPABASE_ANON_KEY,
				'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
				'Accept-Profile': 'website',
				'Content-Profile': 'website'
			}
		});

		if (response.ok) {
			const posts = await response.json();
			return { posts, configured: true };
		}
		return { posts: [], configured: false, error: 'Failed to fetch posts' };
	} catch (e) {
		return { posts: [], configured: false, error: 'Failed to connect to database' };
	}
};
