<script lang="ts">
    import '../../app.css';
    import { page } from '$app/stores';
    import { locale, toggleLocale } from '$lib/i18n';
    import CodingAnimation from '$lib/components/CodingAnimation.svelte';
    import { browser } from '$app/environment';
    
    $: isActive = (path: string) => $page.url.pathname === path || (path === '/' && $page.url.pathname === '/');
    
    // Get translations reactively
    const translations = {
        en: {
            home: 'Home',
            about: 'About',
            blog: 'Blog',
            github: 'GitHub',
            switchLang: '中文'
        },
        zh: {
            home: '首页',
            about: '关于',
            blog: '博客',
            github: 'GitHub',
            switchLang: 'EN'
        }
    };
    
    $: langText = translations[$locale];
</script>

<CodingAnimation />

<div class="min-h-screen flex flex-col bg-transparent text-white">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <nav class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="text-xl font-semibold text-white hover:text-emerald-400 transition-colors">
                &lt;Cesar /&gt;
            </a>
            
            <div class="flex items-center gap-8">
                <a href="/" class={`text-sm font-medium transition-colors ${isActive('/') ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
                    {langText.home}
                </a>
                <a href="/about" class={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
                    {langText.about}
                </a>
                <a href="/blog" class={`text-sm font-medium transition-colors ${isActive('/blog') ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
                    {langText.blog}
                </a>
                <a href="https://github.com/caijinhai" target="_blank" rel="noopener" class="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    {langText.github}
                </a>
                
                <!-- Language Switcher -->
                <button 
                    on:click={() => browser && toggleLocale()}
                    class="px-3 py-1 text-xs font-mono border border-gray-600 rounded hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                    {langText.switchLang}
                </button>
            </div>
        </nav>
    </header>
    
    <!-- Main Content -->
    <main class="flex-1">
        <slot />
    </main>
    
    <!-- Footer -->
    <footer class="border-t border-gray-800 py-8 px-6 bg-black/30">
        <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2026 Cesar Cai. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="https://github.com/caijinhai" target="_blank" rel="noopener" class="hover:text-emerald-400 transition-colors">GitHub</a>
                <a href="/blog" class="hover:text-emerald-400 transition-colors">Blog</a>
            </div>
        </div>
    </footer>
</div>
