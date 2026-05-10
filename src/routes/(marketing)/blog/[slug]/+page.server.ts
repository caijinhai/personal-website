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

export const load: PageServerLoad = async ({ params, fetch, platform }) => {
	const slug = params.slug;
	const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = getSupabaseEnv(platform);

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		return { post: null, content: '', configured: false };
	}

	try {
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/posts?id=eq.${slug}&select=id,title,title_zh,excerpt,excerpt_zh,content_en_path,content_zh_path,tags,created_at&published=eq.true`,
			{
				headers: {
					'apikey': SUPABASE_ANON_KEY,
					'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
					'Accept-Profile': 'website',
					'Content-Profile': 'website'
				}
			}
		);

		if (!response.ok) {
			return { post: null, content: '', error: 'Failed to fetch post' };
		}

		const data = await response.json();
		const post = data.length > 0 ? data[0] : null;

		if (!post) {
			return { post: null, content: '' };
		}

		const contentPath = post.content_zh_path || post.content_en_path;
		let content = '';

		if (contentPath) {
			const contentUrl = `${SUPABASE_URL}/storage/v1/object/public/${contentPath}`;
			const contentResponse = await fetch(contentUrl);
			if (contentResponse.ok) {
				content = await contentResponse.text();
			}
		}

		return { post, content, configured: true };
	} catch (e) {
		return { post: null, content: '', error: 'Failed to connect to database' };
	}
};
