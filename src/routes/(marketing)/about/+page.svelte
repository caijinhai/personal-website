<svelte:head>
    <title>{$locale === 'en' ? 'About - Cesar Cai' : '关于 - 蔡金海'}</title>
    <meta name="description" content="Learn more about Cesar Cai, a backend engineer specializing in Python, Go, AI applications, and DevOps." />
</svelte:head>

<script lang="ts">
    import { locale, t } from '$lib/i18n';

    const techStack = {
        languages: ['Python', 'PHP', 'Go', 'JavaScript', 'TypeScript'],
        frameworks: ['Django', 'Laravel', 'Gin', 'Vue.js', 'React'],
        databases: ['MySQL', 'Redis', 'MongoDB', 'PostgreSQL'],
        tools: ['Docker', 'Kubernetes', 'Ansible', 'Shell', 'Git', 'GitLab', 'Jenkins'],
        aiTools: ['OpenClaw', 'Claude Code', 'Skills', 'AI APIs', 'LLM Integration']
    };

    const tools = [
        {
            name: 'OpenClaw',
            icon: '🦎',
            description: $locale === 'en' 
                ? 'AI agent orchestration platform for building autonomous workflows' 
                : 'AI 智能体编排平台，用于构建自主工作流',
            link: 'https://openclaw.ai',
            color: 'from-emerald-500 to-teal-500'
        },
        {
            name: 'Claude Code',
            icon: '🤖',
            description: $locale === 'en'
                ? 'AI-powered coding assistant for accelerated development'
                : 'AI 驱动的编程助手，加速开发效率',
            link: 'https://claude.ai/code',
            color: 'from-purple-500 to-indigo-500'
        },
        {
            name: 'Skills',
            icon: '🛠️',
            description: $locale === 'en'
                ? 'Custom skill extensions for specialized AI agent capabilities'
                : '自定义技能扩展，赋予 AI 智能体专业化能力',
            link: 'https://clawhub.ai',
            color: 'from-orange-500 to-red-500'
        }
    ];
</script>

<div class="max-w-4xl mx-auto px-6 py-20">
    <section class="space-y-12">
        <!-- Header -->
        <div class="space-y-4">
            <p class="text-sm font-medium text-emerald-400 tracking-wide uppercase font-mono">
                {$t('about.title')}
            </p>
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                {$t('about.headline')}<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{$t('about.headline2')}</span>
            </h1>
        </div>
        
        <!-- About Text -->
        <div class="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
            <p>
                {$t('about.desc1')}
            </p>
            <p>
                {$t('about.desc2')}
            </p>
            <p>
                {$t('about.desc3')}
            </p>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 py-8 border-y border-gray-800">
            <div class="text-center">
                <p class="text-4xl font-bold text-white">3-4</p>
                <p class="text-sm text-gray-500 mt-1">{$t('about.experience')}</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-bold text-white">20+</p>
                <p class="text-sm text-gray-500 mt-1">{$t('about.projects')}</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-bold text-emerald-400">30+</p>
                <p class="text-sm text-gray-500 mt-1">{$t('about.technologies')}</p>
            </div>
        </div>

        <!-- AI Tools Cards -->
        <div class="space-y-6">
            <h2 class="text-xl font-semibold text-white font-mono">
                <span class="text-emerald-400">//</span> AI Tools
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each tools as tool}
                    <a 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener"
                        class="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800 p-6 hover:border-transparent transition-all duration-300"
                    >
                        <!-- Gradient Background -->
                        <div class="absolute inset-0 bg-gradient-to-br {tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        
                        <!-- Content -->
                        <div class="relative space-y-4">
                            <div class="text-4xl">{tool.icon}</div>
                            <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {tool.name}
                            </h3>
                            <p class="text-gray-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                            <div class="flex items-center gap-2 text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>{$locale === 'en' ? 'Learn more' : '了解更多'}</span>
                                <span>→</span>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
        
        <!-- Tech Stack -->
        <div class="space-y-6">
            <h2 class="text-xl font-semibold text-white font-mono">
                <span class="text-emerald-400">//</span> {$t('tech.title')}
            </h2>
            
            <div class="space-y-6">
                <!-- Languages -->
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {$t('tech.languages')}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.languages as lang}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {lang}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <!-- Frameworks -->
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {$t('tech.frameworks')}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.frameworks as framework}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {framework}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <!-- Databases -->
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {$t('tech.databases')}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.databases as db}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {db}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <!-- Tools -->
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {$t('tech.tools')}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.tools as tool}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {tool}
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Work Experience -->
        <div class="space-y-6">
            <h2 class="text-xl font-semibold text-white font-mono">
                <span class="text-emerald-400">//</span> {$locale === 'en' ? 'Work Experience' : '工作经历'}
            </h2>
            
            <div class="space-y-6">
                <!-- 北京三熊教育 -->
                <div class="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="font-semibold text-white">{$locale === 'en' ? 'Beijing Sanxiong Education' : '北京三熊教育'}</h3>
                            <p class="text-sm text-emerald-400">2019 - {$locale === 'en' ? 'Present' : '至今'}</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-gray-400 text-sm">
                        <p>• {$locale === 'en' ? 'Built management backend with Vue + Django' : '使用 Vue + Django 构建管理后台'}</p>
                        <p>• {$locale === 'en' ? 'Video upload/audit/release management system' : '视频上传/审核/上线管理系统'}</p>
                        <p>• {$locale === 'en' ? 'Desktop tool with Vue + Electron + FFmpeg' : '桌面工具：Vue + Electron + FFmpeg'}</p>
                    </div>
                </div>

                <!-- 武汉群硕软件 -->
                <div class="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="font-semibold text-white">{$locale === 'en' ? 'Wuhan Qunsheng Software' : '武汉群硕软件'}</h3>
                            <p class="text-sm text-gray-500">2017 - 2019</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-gray-400 text-sm">
                        <p>• {$locale === 'en' ? 'Vivo smartphone distribution platform (K8s + Istio)' : 'vivo 智能手机分销平台 (K8s + Istio)'}</p>
                        <p>• {$locale === 'en' ? 'Built WebSocket messaging module' : '构建 WebSocket 消息推送模块'}</p>
                        <p>• {$locale === 'en' ? 'SCRM platform deployment (MongoDB/Redis/gRPC)' : 'SCRM 平台部署 (MongoDB/Redis/gRPC)'}</p>
                        <p>• {$locale === 'en' ? 'AWS Serverless project (Lambda + S3 + CloudFront)' : 'AWS Serverless 项目 (Lambda + S3 + CloudFront)'}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
