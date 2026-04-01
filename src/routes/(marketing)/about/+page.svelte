<svelte:head>
    <title>About - Cesar Cai</title>
    <meta name="description" content="Learn more about Cesar Cai, a full stack developer specializing in AI and modern web technologies." />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-20">
    <section class="space-y-12">
        <div class="space-y-4">
            <p class="text-sm font-medium text-emerald-400 tracking-wide uppercase font-mono">
                // About Me
            </p>
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                Building the future,<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">one line at a time.</span>
            </h1>
        </div>
        
        <div class="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
            <p>
                I'm a full stack developer based in China, passionate about creating 
                elegant, user-friendly applications that solve real problems.
            </p>
            <p>
                With experience in web development, cloud infrastructure, and AI integration, 
                I help bring ideas to life through clean, maintainable code.
            </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-800">
            <div>
                <p class="text-3xl font-bold text-white">3+</p>
                <p class="text-sm text-gray-500 mt-1">Years Experience</p>
            </div>
            <div>
                <p class="text-3xl font-bold text-white">50+</p>
                <p class="text-sm text-gray-500 mt-1">Projects Completed</p>
            </div>
            <div>
                <p class="text-3xl font-bold text-white">20+</p>
                <p class="text-sm text-gray-500 mt-1">Happy Clients</p>
            </div>
            <div>
                <p class="text-3xl font-bold text-emerald-400">∞</p>
                <p class="text-sm text-gray-500 mt-1">Curiosity</p>
            </div>
        </div>
        
        <div class="space-y-6">
            <h2 class="text-xl font-semibold text-white font-mono">
                <span class="text-emerald-400">//</span> Technologies I Use
            </h2>
            <div class="flex flex-wrap gap-3">
                {#each ['JavaScript', 'TypeScript', 'Python', 'React', 'Svelte', 'Node.js', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Cloudflare', 'AI/LLM APIs'] as tech}
                    <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                        {tech}
                    </span>
                {/each}
            </div>
        </div>
        
        <div class="space-y-6">
            <h2 class="text-xl font-semibold text-white font-mono">
                <span class="text-emerald-400">//</span> Get in Touch
            </h2>
            <p class="text-gray-400">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a href="/contact" class="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                <span>Say Hello</span>
                <span>→</span>
            </a>
        </div>
    </section>
</div>
