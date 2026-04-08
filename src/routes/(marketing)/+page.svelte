<svelte:head>
    <title>Cesar Cai - {$locale === 'en' ? 'Backend Engineer' : '后端工程师'}</title>
    <meta name="description" content="Backend Engineer specializing in Python, Go, AI applications, and modern backend technologies." />
</svelte:head>

<script lang="ts">
    import { locale, t } from '$lib/i18n';
</script>

<div class="max-w-4xl mx-auto px-6 py-20">
    <!-- Hero Section -->
    <section class="min-h-[70vh] flex flex-col justify-center">
        <div class="space-y-8">
            <p class="text-sm font-medium text-emerald-400 tracking-wide uppercase font-mono">
                {$t('hero.greeting')}
            </p>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                {$t('hero.title')}<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{$t('hero.name')}</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
                {$t('hero.subtitle')}
            </p>
            
            <div class="flex flex-wrap gap-4 pt-4">
                <a href="/blog" class="inline-flex items-center px-6 py-3 bg-emerald-500 text-black text-sm font-medium rounded-full hover:bg-emerald-400 transition-colors">
                    {$t('hero.readBlog')}
                </a>
                <a href="/about" class="inline-flex items-center px-6 py-3 border border-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-800 hover:border-gray-500 transition-colors">
                    {$t('hero.learnMore')}
                </a>
                <a href="https://github.com/caijinhai" target="_blank" rel="noopener" class="inline-flex items-center px-6 py-3 border border-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-800 hover:border-gray-500 transition-colors">
                    {$t('hero.viewGithub')}
                </a>
            </div>
            
            <!-- Terminal-style code snippet -->
            <div class="bg-gray-900/80 rounded-xl p-6 font-mono text-sm border border-gray-800 backdrop-blur-sm mt-8">
                <div class="flex gap-2 mb-4">
                    <span class="w-3 h-3 rounded-full bg-red-500"></span>
                    <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span class="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <pre class="text-gray-400 overflow-x-auto"><code><span class="text-purple-400">&#123;</span>
  <span class="text-emerald-400">"name"</span>: <span class="text-green-400">"Cesar Cai"</span>,
  <span class="text-emerald-400">"title"</span>: <span class="text-green-400">"{$locale === 'en' ? 'Backend Engineer' : '后端工程师'}"</span>,
  <span class="text-emerald-400">"skills"</span>: <span class="text-yellow-400">["Python", "Go", "PHP", "Docker", "K8s"]</span>,
  <span class="text-emerald-400">"passion"</span>: <span class="text-green-400">"{$locale === 'en' ? 'Building great products' : '打造优秀产品'}"</span>,
  <span class="text-emerald-400">"status"</span>: <span class="text-emerald-400">"{$locale === 'en' ? 'open to work' : '寻求工作机会'}"</span>
<span class="text-purple-400">&#125;</span></code></pre>
            </div>
        </div>
    </section>
    
    <!-- Skills Section -->
    <section class="py-20 border-t border-gray-800">
        <h2 class="text-sm font-medium text-gray-500 tracking-wide uppercase mb-8 font-mono">
            {$t('skills.title')}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-3 p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
                <h3 class="font-semibold text-white">{$t('skills.web.title')}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                    {$t('skills.web.desc')}
                </p>
            </div>
            
            <div class="space-y-3 p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 class="font-semibold text-white">{$t('skills.ai.title')}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                    {$t('skills.ai.desc')}
                </p>
            </div>
            
            <div class="space-y-3 p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <h3 class="font-semibold text-white">{$t('skills.system.title')}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                    {$t('skills.system.desc')}
                </p>
            </div>

            <div class="space-y-3 p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                </div>
                <h3 class="font-semibold text-white">{$t('skills.devops.title')}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                    {$t('skills.devops.desc')}
                </p>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-20 border-t border-gray-800 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {$t('cta.title')}
        </h2>
        <p class="text-gray-400 mb-8">
            {$t('cta.subtitle')}
        </p>
        <a href="https://github.com/caijinhai" target="_blank" rel="noopener" class="inline-flex items-center px-8 py-4 bg-emerald-500 text-black text-lg font-medium rounded-full hover:bg-emerald-400 transition-colors">
            {$t('cta.github')}
        </a>
    </section>
</div>
