<script lang="ts">
    import '../../app.css';
    import { page } from '$app/stores';
    import ThreeBackground from '$lib/components/ThreeBackground.svelte';
    import CodingAnimation from '$lib/components/CodingAnimation.svelte';
    
    $: isActive = (path: string) => $page.url.pathname === path || (path === '/' && $page.url.pathname === '/');
</script>

<ThreeBackground />
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
                    Home
                </a>
                <a href="/about" class={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
                    About
                </a>
                <a href="/blog" class={`text-sm font-medium transition-colors ${isActive('/blog') ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
                    Blog
                </a>
                <a href="/contact" class={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
                    Contact
                </a>
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
                <a href="https://twitter.com" target="_blank" rel="noopener" class="hover:text-emerald-400 transition-colors">Twitter</a>
                <a href="/blog" class="hover:text-emerald-400 transition-colors">Blog</a>
            </div>
        </div>
    </footer>
</div>
