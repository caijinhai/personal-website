<script lang="ts">
	import type { PageData } from './$types';
	import { locale, t } from '$lib/i18n';

	export let data: PageData;

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString($locale === 'en' ? 'en-US' : 'zh-CN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog - Cesar Cai</title>
	<meta name="description" content="Articles about backend development, AI technologies, DevOps, and lessons learned along the way." />
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-20">
	<header class="mb-16">
		<h1 class="text-5xl font-bold text-white mb-6">
			{t('blog.title')}
		</h1>
		<p class="text-xl text-gray-400 leading-relaxed">
			{t('blog.subtitle')}
		</p>
	</header>

	{#if data.error}
		<!-- Error State -->
		<div class="text-center py-20">
			<p class="text-red-400 mb-4">{data.error}</p>
			<p class="text-gray-400">Please try again later or contact the administrator.</p>
		</div>
	{:else if !data.configured}
		<!-- Demo Posts (when Supabase is not configured) -->
		<div class="space-y-6">
			{#each [
				{
					id: '1',
					title: 'Building Scalable Backend Systems with Go',
					title_zh: '使用 Go 构建可扩展后端系统',
					excerpt: 'A deep dive into designing and implementing scalable backend architectures using Go, Docker, and Kubernetes.',
					excerpt_zh: '深入探讨使用 Go、Docker 和 Kubernetes 设计和实现可扩展的后端架构。',
					tags: ['Go', 'Backend', 'DevOps'],
					created_at: '2026-03-15T10:00:00Z'
				},
				{
					id: '2',
					title: 'AI Agent Workflows with OpenClaw',
					title_zh: '使用 OpenClaw 构建 AI 智能体工作流',
					excerpt: 'How I built autonomous AI agent workflows using OpenClaw and Claude Code for automated task execution.',
					excerpt_zh: '如何使用 OpenClaw 和 Claude Code 构建自主 AI 智能体工作流实现自动化任务执行。',
					tags: ['AI', 'OpenClaw', 'Automation'],
					created_at: '2026-03-10T10:00:00Z'
				},
				{
					id: '3',
					title: 'DevOps Best Practices for Small Teams',
					title_zh: '小团队 DevOps 最佳实践',
					excerpt: 'Practical DevOps strategies and tools that helped our small team achieve enterprise-level deployment automation.',
					excerpt_zh: '实用的 DevOps 策略和工具，帮助我们的小团队实现企业级部署自动化。',
					tags: ['DevOps', 'Docker', 'CI/CD'],
					created_at: '2026-03-05T10:00:00Z'
				}
			] as post}
				<a
					href="/blog/{post.id}"
					class="block group p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
				>
					<article class="space-y-3">
						<div class="flex items-center gap-3 text-sm text-gray-500">
							<span class="text-emerald-400">{post.tags[0]}</span>
							<span class="w-1 h-1 rounded-full bg-gray-600"></span>
							<span>{formatDate(post.created_at)}</span>
						</div>
						<h2 class="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
							{$locale === 'en' ? post.title : post.title_zh}
						</h2>
						<p class="text-gray-400 leading-relaxed">
							{$locale === 'en' ? post.excerpt : post.excerpt_zh}
						</p>
						<div class="flex items-center gap-2 text-sm text-emerald-400 pt-2">
							<span>{t('blog.readMore')}</span>
						</div>
					</article>
				</a>
			{/each}
		</div>
	{:else if data.posts.length === 0}
		<!-- Empty State -->
		<div class="text-center py-20">
			<p class="text-gray-400 mb-4">No blog posts yet.</p>
		</div>
	{:else}
		<!-- Real Posts from Supabase -->
		<div class="space-y-6">
			{#each data.posts as post}
				<a
					href="/blog/{post.id}"
					class="block group p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
				>
					<article class="space-y-3">
						<div class="flex items-center gap-3 text-sm text-gray-500">
							{#if post.tags && post.tags.length > 0}
								{#each post.tags as tag}
									<span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
										{tag}
									</span>
								{/each}
								<span class="w-1 h-1 rounded-full bg-gray-600"></span>
							{/if}
							<span>{formatDate(post.created_at)}</span>
						</div>
						<h2 class="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
							{$locale === 'en' ? post.title : post.title_zh}
						</h2>
						<p class="text-gray-400 leading-relaxed">
							{$locale === 'en' ? post.excerpt : post.excerpt_zh}
						</p>
						<div class="flex items-center gap-2 text-sm text-emerald-400 pt-2">
							<span>{t('blog.readMore')}</span>
						</div>
					</article>
				</a>
			{/each}
		</div>
	{/if}
</div>
