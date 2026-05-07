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

<style>
    .prose-content {
        color: #d1d5db;
        line-height: 1.8;
        font-size: 1.05rem;
    }
    .prose-content h1 {
        font-size: 1.875rem;
        font-weight: 700;
        color: #fff;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        line-height: 1.3;
    }
    .prose-content h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        margin-top: 2.5rem;
        margin-bottom: 1.25rem;
        line-height: 1.3;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #374151;
    }
    .prose-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #fff;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .prose-content p {
        margin-bottom: 1.25rem;
    }
    .prose-content a {
        color: #34d399;
        text-decoration: none;
        border-bottom: 1px solid rgba(52, 211, 153, 0.3);
        transition: border-color 0.2s;
    }
    .prose-content a:hover {
        border-bottom-color: #34d399;
    }
    .prose-content strong {
        color: #fff;
        font-weight: 600;
    }
    .prose-content em {
        font-style: italic;
    }
    .prose-content ul, .prose-content ol {
        margin-bottom: 1.25rem;
        padding-left: 1.5rem;
    }
    .prose-content ul {
        list-style: none;
        padding-left: 0;
    }
    .prose-content ul li {
        position: relative;
        padding-left: 1.25rem;
        margin-bottom: 0.5rem;
    }
    .prose-content ul li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.75em;
        width: 5px;
        height: 5px;
        background: #34d399;
        border-radius: 50%;
    }
    .prose-content ol {
        list-style: decimal;
        list-style-position: inside;
    }
    .prose-content ol li {
        margin-bottom: 0.5rem;
    }
    .prose-content li {
        color: #9ca3af;
    }
    .prose-content code {
        font-family: ui-monospace, 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
        font-size: 0.875em;
    }
    .prose-content p code,
    .prose-content li code {
        background: #1f2937;
        color: #fbbf24;
        padding: 0.15em 0.4em;
        border-radius: 4px;
        border: 1px solid #374151;
    }
    .prose-content pre {
        background: #1e1e2e !important;
        border: 1px solid #374151;
        border-radius: 12px;
        padding: 1.25rem;
        margin: 1.5rem 0;
        overflow-x: auto;
        position: relative;
    }
    .prose-content pre code {
        background: none;
        border: none;
        padding: 0;
        color: inherit;
        font-size: 0.875rem;
        line-height: 1.7;
    }
    .prose-content hr {
        border: none;
        height: 1px;
        background: #374151;
        margin: 2.5rem 0;
    }
    .prose-content blockquote {
        border-left: 3px solid #34d399;
        padding-left: 1rem;
        margin: 1.5rem 0;
        color: #9ca3af;
        font-style: italic;
        background: rgba(52, 211, 153, 0.05);
        padding: 1rem 1rem 1rem 1.25rem;
        border-radius: 0 8px 8px 0;
    }
    .prose-content table {
        width: 100%;
        margin: 1.5rem 0;
        border-collapse: collapse;
        border: 1px solid #374151;
        border-radius: 8px;
        overflow: hidden;
    }
    .prose-content th {
        background: #1f2937;
        color: #fff;
        font-weight: 600;
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 2px solid #374151;
    }
    .prose-content td {
        padding: 0.625rem 1rem;
        border-bottom: 1px solid #1f2937;
        color: #d1d5db;
    }
    .prose-content tr:last-child td {
        border-bottom: none;
    }
    .prose-content tr:hover td {
        background: rgba(52, 211, 153, 0.03);
    }
    .prose-content img {
        border-radius: 12px;
        margin: 1.5rem 0;
        border: 1px solid #374151;
    }

    /* highlight.js atom-one-dark theme */
    .prose-content pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
    }
    .prose-content code.hljs {
        padding: 3px 5px;
    }
    .prose-content .hljs {
        color: #abb2bf;
        background: transparent;
    }
    .prose-content .hljs-comment,
    .prose-content .hljs-quote {
        color: #5c6370;
        font-style: italic;
    }
    .prose-content .hljs-doctag,
    .prose-content .hljs-keyword,
    .prose-content .hljs-formula {
        color: #c678dd;
    }
    .prose-content .hljs-section,
    .prose-content .hljs-name,
    .prose-content .hljs-selector-tag,
    .prose-content .hljs-deletion,
    .prose-content .hljs-subst {
        color: #e06c75;
    }
    .prose-content .hljs-literal {
        color: #56b6c2;
    }
    .prose-content .hljs-string,
    .prose-content .hljs-regexp,
    .prose-content .hljs-addition,
    .prose-content .hljs-attribute,
    .prose-content .hljs-meta .hljs-string {
        color: #98c379;
    }
    .prose-content .hljs-attr,
    .prose-content .hljs-variable,
    .prose-content .hljs-template-variable,
    .prose-content .hljs-type,
    .prose-content .hljs-selector-class,
    .prose-content .hljs-selector-attr,
    .prose-content .hljs-selector-pseudo,
    .prose-content .hljs-number {
        color: #d19a66;
    }
    .prose-content .hljs-symbol,
    .prose-content .hljs-bullet,
    .prose-content .hljs-link,
    .prose-content .hljs-meta,
    .prose-content .hljs-selector-id,
    .prose-content .hljs-title {
        color: #61aeee;
    }
    .prose-content .hljs-built_in,
    .prose-content .hljs-title\.class_,
    .prose-content .hljs-class .hljs-title {
        color: #e6c07b;
    }
    .prose-content .hljs-emphasis {
        font-style: italic;
    }
    .prose-content .hljs-strong {
        font-weight: bold;
    }
    .prose-content .hljs-link {
        text-decoration: underline;
    }
</style>