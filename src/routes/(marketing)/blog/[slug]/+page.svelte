<script lang="ts">
    import { locale, t } from '$lib/i18n';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { env } from '$env/dynamic/public';

    interface BlogPost {
        id: string;
        title: string;
        title_zh: string;
        excerpt: string;
        excerpt_zh: string;
        content_en: string;
        content_zh: string;
        created_at: string;
        tags: string[];
        published: boolean;
    }

    let post: BlogPost | null = null;
    let loading = true;
    let error = '';

    onMount(async () => {
        const slug = $page.params.slug;
        const supabaseUrl = env.PUBLIC_SUPABASE_URL || '';
        const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || '';
        
        if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co') {
            error = 'Supabase not configured';
            loading = false;
            return;
        }

        try {
            const response = await fetch(
                `${supabaseUrl}/rest/v1/posts?id=eq.${slug}&select=*&published=eq.true`, 
                {
                    headers: {
                        'apikey': supabaseAnonKey,
                        'Authorization': `Bearer ${supabaseAnonKey}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                post = data.length > 0 ? data[0] : null;
            } else {
                error = 'Failed to fetch post';
            }
        } catch (e) {
            error = 'Failed to connect to database';
        } finally {
            loading = false;
        }
    });

    function formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString($locale === 'en' ? 'en-US' : 'zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function renderMarkdown(content: string): string {
        // Simple markdown to HTML conversion
        return content
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mt-8 mb-4">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-white mt-10 mb-5">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-gray-300 mb-2">$1</li>')
            .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-gray-300 mb-2">$1</li>')
            .replace(/\n/gim, '<br />')
            .replace(/\|(.*)\|/gim, (match) => {
                const cells = match.split('|').filter(c => c.trim());
                if (cells.some(c => c.includes('---'))) return '';
                return `<tr class="border-b border-gray-700">${cells.map(c => `<td class="py-2 px-4 text-gray-300">${c.trim()}</td>`).join('')}</tr>`;
            });
    }
</script>

<svelte:head>
    <title>{post?.title || 'Article'} - Cesar Cai</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-20">
    {#if loading}
        <!-- Loading State -->
        <div class="animate-pulse space-y-6">
            <div class="h-4 bg-gray-700 rounded w-1/4"></div>
            <div class="h-10 bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-700 rounded w-1/2"></div>
            <div class="h-64 bg-gray-700 rounded"></div>
        </div>
    {:else if error}
        <!-- Error State -->
        <div class="text-center py-20">
            <p class="text-red-400 mb-4">{error}</p>
            <a href="/blog" class="text-emerald-400 hover:text-emerald-300">
                ← {t('article.back')}
            </a>
        </div>
    {:else if post}
        <!-- Article -->
        <article class="space-y-8">
            <!-- Back Link -->
            <a href="/blog" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                ← {t('article.back')}
            </a>

            <!-- Header -->
            <header class="space-y-4">
                <div class="flex items-center gap-3 text-sm text-gray-500">
                    {#if post.tags && post.tags.length > 0}
                        <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
                            {post.tags[0]}
                        </span>
                        <span class="w-1 h-1 rounded-full bg-gray-600"></span>
                    {/if}
                    <span>{t('article.published')} {formatDate(post.created_at)}</span>
                </div>

                <h1 class="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {$locale === 'en' ? post.title : post.title_zh}
                </h1>

                {#if post.excerpt || post.excerpt_zh}
                    <p class="text-xl text-gray-400 leading-relaxed">
                        {$locale === 'en' ? post.excerpt : post.excerpt_zh}
                    </p>
                {/if}
            </header>

            <!-- Content -->
            <div class="prose prose-invert prose-emerald max-w-none">
                <div class="text-gray-300 leading-relaxed space-y-4">
                    {@html renderMarkdown($locale === 'en' ? post.content_en : post.content_zh)}
                </div>
            </div>

            <!-- Tags -->
            {#if post.tags && post.tags.length > 0}
                <div class="flex flex-wrap gap-2 pt-8 border-t border-gray-800">
                    {#each post.tags as tag}
                        <span class="px-3 py-1 bg-gray-900/50 text-gray-400 text-sm rounded-full border border-gray-700">
                            {tag}
                        </span>
                    {/each}
                </div>
            {/if}
        </article>
    {:else}
        <!-- Not Found -->
        <div class="text-center py-20">
            <h1 class="text-3xl font-bold text-white mb-4">Post not found</h1>
            <p class="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
            <a href="/blog" class="text-emerald-400 hover:text-emerald-300">
                ← {t('article.back')}
            </a>
        </div>
    {/if}
</div>