import type { PageServerLoad } from './$types';

function getSupabaseEnv(platform?: { env?: Record<string, string> }): { url: string; anonKey: string } {
	// Cloudflare Pages: secrets 通过 platform.env 注入
	// 本地 Node.js 开发: process.env 可用
	const platformEnv = platform?.env || {};
	const nodeEnv = (typeof process !== 'undefined' && process.env) || {};
	const env: Record<string, string> = { ...nodeEnv, ...platformEnv } as Record<string, string>;
	return {
		url: env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL || '',
		anonKey: env.SUPABASE_ANON_KEY || env.PUBLIC_SUPABASE_ANON_KEY || ''
	};
}

export const load: PageServerLoad = async ({ fetch, platform }) => {
	const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = getSupabaseEnv(platform);

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
