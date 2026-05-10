import type { PageServerLoad } from './$types';

function getSupabaseConfig(platform?: any): { url: string; anonKey: string } {
	// Cloudflare Pages: secrets 通过 env 对象注入
	// 1. 尝试 platform.env（SvelteKit adapter-cloudflare 方式）
	// 2. 尝试 event.platform.env（hooks 中）
	// 3. 尝试 process.env（本地开发）
	const sources = [
		platform?.env || {},
		(typeof process !== 'undefined' && process.env) || {}
	];

	for (const src of sources) {
		const url = src.SUPABASE_URL || src.PUBLIC_SUPABASE_URL || '';
		const anonKey = src.SUPABASE_ANON_KEY || src.PUBLIC_SUPABASE_ANON_KEY || '';
		if (url && anonKey) {
			return { url, anonKey };
		}
	}

	// Fallback: 检查全局变量（Cloudflare Workers 直接暴露为全局）
	if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined') {
		return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
	}

	return { url: '', anonKey: '' };
}

export const load: PageServerLoad = async ({ fetch, platform }) => {
	const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = getSupabaseConfig(platform);

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
		return { posts: [], configured: true, error: 'Failed to fetch posts' };
	} catch (e: any) {
		return { posts: [], configured: true, error: String(e.message || e) };
	}
};
