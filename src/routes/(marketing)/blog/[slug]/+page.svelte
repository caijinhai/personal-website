<script lang="ts">
    import { locale, t } from '$lib/i18n';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { env } from '$env/dynamic/public';
    import { marked } from 'marked';
    import hljs from 'highlight.js/lib/core';
    import go from 'highlight.js/lib/languages/go';
    import typescript from 'highlight.js/lib/languages/typescript';
    import javascript from 'highlight.js/lib/languages/javascript';
    import python from 'highlight.js/lib/languages/python';
    import bash from 'highlight.js/lib/languages/bash';
    import yaml from 'highlight.js/lib/languages/yaml';
    import dockerfile from 'highlight.js/lib/languages/dockerfile';

    hljs.registerLanguage('go', go);
    hljs.registerLanguage('ts', typescript);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('shell', bash);
    hljs.registerLanguage('yaml', yaml);
    hljs.registerLanguage('yml', yaml);
    hljs.registerLanguage('dockerfile', dockerfile);

    marked.setOptions({
        highlight: (code, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true
    });

    interface BlogPost {
        id: string;
        title: string;
        title_zh: string;
        excerpt: string;
        excerpt_zh: string;
        content_en_path: string;
        content_zh_path: string;
        created_at: string;
        tags: string[];
        published: boolean;
    }

    let post: BlogPost | null = null;
    let loading = true;
    let error = '';
    let content = '';

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
            // 1. 从数据库获取文章元数据
            const response = await fetch(
                `${supabaseUrl}/rest/v1/posts?id=eq.${slug}&select=id,title,title_zh,excerpt,excerpt_zh,content_en_path,content_zh_path,tags,created_at&published=eq.true`,
                {
                    headers: {
                        'apikey': supabaseAnonKey,
                        'Authorization': `Bearer ${supabaseAnonKey}`,
                        'Accept-Profile': 'website',
                        'Content-Profile': 'website'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                post = data.length > 0 ? data[0] : null;

                // 2. 从 Storage 读取内容
                if (post) {
                    const contentPath = $locale === 'en' ? post.content_en_path : post.content_zh_path;
                    const contentUrl = `${supabaseUrl}/storage/v1/object/public/${contentPath}`;

                    const contentResponse = await fetch(contentUrl);
                    if (contentResponse.ok) {
                        content = await contentResponse.text();
                    } else {
                        error = 'Failed to fetch content from storage';
                    }
                }
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

    $: renderedContent = content ? marked.parse(content) : '';
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
        <article>
            <!-- Back Link -->
            <a href="/blog" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-400 transition-colors mb-12">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                {t('article.back')}
            </a>

            <!-- Header -->
            <header class="space-y-6 pb-8 border-b border-gray-800">
                <div class="flex items-center gap-3 text-sm">
                    {#if post.tags && post.tags.length > 0}
                        {#each post.tags as tag}
                            <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        {/each}
                    {/if}
                </div>

                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {$locale === 'en' ? post.title : post.title_zh}
                </h1>

                {#if post.excerpt || post.excerpt_zh}
                    <p class="text-lg text-gray-400 leading-relaxed max-w-2xl">
                        {$locale === 'en' ? post.excerpt : post.excerpt_zh}
                    </p>
                {/if}

                <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span>{t('article.published')} {formatDate(post.created_at)}</span>
                </div>
            </header>

            <!-- Content from Storage -->
            {#if content}
                <div class="prose-content">
                    {@html renderedContent}
                </div>
            {:else}
                <div class="text-center py-10">
                    <p class="text-gray-400">Content loading...</p>
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

<style>
    :global(.prose-content) {
        color: #d1d5db;
        line-height: 1.8;
        font-size: 1.05rem;
        padding-top: 2rem;
    }
    :global(.prose-content h1) {
        font-size: 1.875rem;
        font-weight: 700;
        color: #fff;
        margin-top: 3.5rem;
        margin-bottom: 1.5rem;
        line-height: 1.3;
        letter-spacing: -0.025em;
    }
    :global(.prose-content h2) {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        margin-top: 3rem;
        margin-bottom: 1.25rem;
        line-height: 1.3;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #1f2937;
        letter-spacing: -0.01em;
    }
    :global(.prose-content h3) {
        font-size: 1.25rem;
        font-weight: 600;
        color: #e5e7eb;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
    }
    :global(.prose-content h4) {
        font-size: 1.125rem;
        font-weight: 600;
        color: #e5e7eb;
        margin-top: 2rem;
        margin-bottom: 0.75rem;
    }
    :global(.prose-content p) {
        margin-bottom: 1.5rem;
        color: #9ca3af;
    }
    :global(.prose-content a) {
        color: #34d399;
        text-decoration: none;
        border-bottom: 1px solid rgba(52, 211, 153, 0.3);
        transition: all 0.2s;
    }
    :global(.prose-content a:hover) {
        color: #6ee7b7;
        border-bottom-color: #6ee7b7;
    }
    :global(.prose-content strong) {
        color: #f3f4f6;
        font-weight: 600;
    }
    :global(.prose-content em) {
        font-style: italic;
        color: #d1d5db;
    }
    :global(.prose-content hr) {
        border: none;
        height: 1px;
        background: linear-gradient(to right, transparent, #374151, transparent);
        margin: 3rem 0;
    }
    :global(.prose-content ul),
    :global(.prose-content ol) {
        margin-bottom: 1.5rem;
        padding-left: 0;
    }
    :global(.prose-content ul) {
        list-style: none;
    }
    :global(.prose-content ul li) {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
        color: #9ca3af;
    }
    :global(.prose-content ul li::before) {
        content: '';
        position: absolute;
        left: 0;
        top: 0.85em;
        width: 6px;
        height: 6px;
        background: #34d399;
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(52, 211, 153, 0.3);
    }
    :global(.prose-content ol) {
        list-style: none;
        counter-reset: item;
    }
    :global(.prose-content ol li) {
        position: relative;
        padding-left: 2.5rem;
        margin-bottom: 0.75rem;
        color: #9ca3af;
        counter-increment: item;
    }
    :global(.prose-content ol li::before) {
        content: counter(item);
        position: absolute;
        left: 0;
        top: 0.15em;
        width: 1.75rem;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1f2937;
        color: #34d399;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 6px;
        border: 1px solid #374151;
    }
    :global(.prose-content li > ul),
    :global(.prose-content li > ol) {
        margin-top: 0.5rem;
        margin-bottom: 0;
    }
    :global(.prose-content p code),
    :global(.prose-content li code),
    :global(.prose-content h1 code),
    :global(.prose-content h2 code),
    :global(.prose-content h3 code) {
        font-family: ui-monospace, 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
        background: #1f2937;
        color: #fbbf24;
        padding: 0.2em 0.45em;
        border-radius: 5px;
        border: 1px solid #374151;
        font-weight: 500;
        font-size: 0.875em;
    }
    :global(.prose-content pre) {
        background: #0f172a !important;
        border: 1px solid #1e293b;
        border-radius: 12px;
        margin: 2rem 0;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }
    :global(.prose-content pre code) {
        display: block;
        padding: 1.25rem 1.5rem;
        overflow-x: auto;
        font-size: 0.875rem;
        line-height: 1.7;
        background: none !important;
        border: none;
        color: #e2e8f0;
    }
    :global(.prose-content blockquote) {
        position: relative;
        margin: 2rem 0;
        padding: 1.25rem 1.5rem 1.25rem 2rem;
        background: rgba(52, 211, 153, 0.03);
        border: 1px solid rgba(52, 211, 153, 0.15);
        border-left: 4px solid #34d399;
        border-radius: 0 10px 10px 0;
        color: #9ca3af;
        font-style: italic;
    }
    :global(.prose-content blockquote::before) {
        content: '"';
        position: absolute;
        top: -0.25rem;
        left: 0.5rem;
        font-size: 3rem;
        color: rgba(52, 211, 153, 0.2);
        font-family: Georgia, serif;
        line-height: 1;
    }
    :global(.prose-content blockquote p:last-child) {
        margin-bottom: 0;
    }
    :global(.prose-content table) {
        width: 100%;
        margin: 2rem 0;
        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid #1f2937;
        border-radius: 10px;
        overflow: hidden;
        background: rgba(17, 24, 39, 0.5);
    }
    :global(.prose-content th) {
        background: #111827;
        color: #f3f4f6;
        font-weight: 600;
        padding: 0.875rem 1.25rem;
        text-align: left;
        border-bottom: 2px solid #374151;
    }
    :global(.prose-content td) {
        padding: 0.75rem 1.25rem;
        border-bottom: 1px solid #1f2937;
        color: #d1d5db;
    }
    :global(.prose-content tr:last-child td) {
        border-bottom: none;
    }
    :global(.prose-content tbody tr:hover) {
        background: rgba(52, 211, 153, 0.03);
    }
    :global(.prose-content img) {
        border-radius: 12px;
        margin: 2rem 0;
        border: 1px solid #1f2937;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }

    /* highlight.js atom-one-dark theme */
    :global(.prose-content pre code.hljs) {
        padding: 1.25rem 1.5rem;
    }
    :global(.prose-content code.hljs) {
        padding: 3px 5px;
    }
    :global(.prose-content .hljs) {
        color: #abb2bf;
        background: transparent;
    }
    :global(.prose-content .hljs-comment),
    :global(.prose-content .hljs-quote) {
        color: #5c6370;
        font-style: italic;
    }
    :global(.prose-content .hljs-doctag),
    :global(.prose-content .hljs-keyword),
    :global(.prose-content .hljs-formula) {
        color: #c678dd;
    }
    :global(.prose-content .hljs-section),
    :global(.prose-content .hljs-name),
    :global(.prose-content .hljs-selector-tag),
    :global(.prose-content .hljs-deletion),
    :global(.prose-content .hljs-subst) {
        color: #e06c75;
    }
    :global(.prose-content .hljs-literal) {
        color: #56b6c2;
    }
    :global(.prose-content .hljs-string),
    :global(.prose-content .hljs-regexp),
    :global(.prose-content .hljs-addition),
    :global(.prose-content .hljs-attribute),
    :global(.prose-content .hljs-meta .hljs-string) {
        color: #98c379;
    }
    :global(.prose-content .hljs-attr),
    :global(.prose-content .hljs-variable),
    :global(.prose-content .hljs-template-variable),
    :global(.prose-content .hljs-type),
    :global(.prose-content .hljs-selector-class),
    :global(.prose-content .hljs-selector-attr),
    :global(.prose-content .hljs-selector-pseudo),
    :global(.prose-content .hljs-number) {
        color: #d19a66;
    }
    :global(.prose-content .hljs-symbol),
    :global(.prose-content .hljs-bullet),
    :global(.prose-content .hljs-link),
    :global(.prose-content .hljs-meta),
    :global(.prose-content .hljs-selector-id),
    :global(.prose-content .hljs-title) {
        color: #61aeee;
    }
    :global(.prose-content .hljs-built_in),
    :global(.prose-content .hljs-title\.class_),
    :global(.prose-content .hljs-class .hljs-title) {
        color: #e6c07b;
    }
    :global(.prose-content .hljs-emphasis) {
        font-style: italic;
    }
    :global(.prose-content .hljs-strong) {
        font-weight: bold;
    }
    :global(.prose-content .hljs-link) {
        text-decoration: underline;
    }
</style>