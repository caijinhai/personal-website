import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug;
	const SUPABASE_URL = env.SUPABASE_URL || '';
	const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY || '';

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		return { post: null, content: '', configured: false };
	}

	try {
		// 1. Fetch post metadata from database
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

		// 2. Fetch content from Storage (use default path, will be overridden by locale in page)
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
