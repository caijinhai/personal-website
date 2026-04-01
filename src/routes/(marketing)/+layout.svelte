<script lang="ts">
    import '../../app.css';
    import { page } from '$app/stores';
    
    $: isActive = (path: string) => $page.url.pathname === path;
</script>

<div class="drawer-end">
    <input id="nav-drawer" type="checkbox" class="drawer-toggle" />
    
    <div class="drawer-content flex flex-col min-h-screen">
        <div class="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div class="navbar-start">
                <a href="/" class="btn btn-ghost text-xl">MySite</a>
            </div>
            
            <div class="navbar-center hidden md:flex">
                <ul class="menu menu-horizontal px-1 gap-2">
                    <li><a href="/" class={isActive('/') ? 'active' : ''}>Home</a></li>
                    <li><a href="/about" class={isActive('/about') ? 'active' : ''}>About</a></li>
                    <li><a href="/blog" class={isActive('/blog') ? 'active' : ''}>Blog</a></li>
                    <li><a href="/contact" class={isActive('/contact') ? 'active' : ''}>Contact</a></li>
                </ul>
            </div>
            
            <div class="navbar-end gap-2">
                <a href="/login" class="btn btn-outline btn-sm">Login</a>
                <label for="nav-drawer" class="btn btn-ghost md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
            </div>
        </div>
        
        <main class="flex-1">
            <slot />
        </main>
        
        <footer class="footer footer-center p-6 bg-base-200 text-base-content mt-auto">
            <p>Copyright © 2026 - All rights reserved</p>
        </footer>
    </div>
    
    <div class="drawer-side z-50">
        <label for="nav-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-64 min-h-full bg-base-200">
            <li class="menu-title">Menu</li>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
            <li class="mt-4"><a href="/login" class="btn btn-primary">Login</a></li>
        </ul>
    </div>
</div>
