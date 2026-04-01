<script lang="ts">
    import '../../app.css';
    import { page } from '$app/stores';
    
    $: isActive = (path: string) => $page.url.pathname === path || (path === '/' && $page.url.pathname === '/');
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-900">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="text-xl font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                Cesar
            </a>
            
            <div class="flex items-center gap-8">
                <a href="/" class={`text-sm font-medium transition-colors ${isActive('/') ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}>
                    Home
                </a>
                <a href="/about" class={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}>
                    About
                </a>
                <a href="/blog" class={`text-sm font-medium transition-colors ${isActive('/blog') ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}>
                    Blog
                </a>
                <a href="/contact" class={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}>
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
    <footer class="border-t border-gray-100 py-8 px-6">
        <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2026 Cesar Cai. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="https://github.com/caijinhai" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">Twitter</a>
                <a href="/blog" class="hover:text-gray-900 transition-colors">Blog</a>
            </div>
        </div>
    </footer>
</div>
