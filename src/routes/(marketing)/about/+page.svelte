<svelte:head>
    <title>About - Cesar Cai</title>
    <meta name="description" content="Learn more about Cesar Cai, a backend engineer specializing in Python, Go, AI applications, and DevOps." />
</svelte:head>

<script lang="ts">
    import { locale } from '$lib/i18n';

    const techStack = {
        languages: ['Python', 'PHP', 'Go', 'JavaScript', 'TypeScript', 'C++'],
        frameworks: ['Django', 'Laravel', 'Gin', 'Vue.js', 'React', 'AWS Lambda'],
        databases: ['MySQL', 'Redis', 'MongoDB', 'PostgreSQL', 'InfluxDB', 'Elasticsearch'],
        tools: ['Docker', 'Kubernetes', 'Ansible', 'Shell', 'Git', 'GitLab', 'Jenkins', 'CUDA', 'PyTorch'],
        aiTools: ['OpenClaw', 'Claude Code', 'DeepSeek', 'OpenAI API', 'Anthropic API']
    };

    const translations = {
        en: {
            title: '// About Me',
            headline: 'Building the future,',
            headline2: 'one line at a time.',
            desc1: "I'm a backend senior engineer based in Beijing, passionate about building robust systems and AI-powered applications.",
            desc2: "With 8 years of experience in full-stack development, I've worked with leading companies like Baidu, Vivo, and Qunsheng Software. I specialize in backend development, GPU inference, and AI applications.",
            desc3: "I'm a quick learner, detail-oriented, and always eager to explore new technologies. Currently focusing on AI agent workflows, GPU inference optimization, and automation at Baidu.",
            experience: 'Years Experience',
            projects: 'Projects Completed',
            technologies: 'Technologies Mastered',
            techTitle: 'Tech Stack',
            languages: 'Languages',
            frameworks: 'Frameworks',
            databases: 'Databases',
            tools: 'Tools & Platforms',
            aiTools: 'AI Tools',
            workExperience: 'Work Experience',
            baiduCompany: 'Beijing Baidu',
            sanxiongCompany: 'Beijing Sanxiong Education',
            qunshengCompany: 'Wuhan Qunsheng Software',
            present: 'Present',
            baiduDesc1: 'Digital human product capabilities: avatar/video generation, video processing pipeline',
            baiduDesc2: 'Developed async framework, DAG workflow framework, 60+ service versions online',
            baiduDesc3: 'GPU inference optimization, CPU/GPU heterogeneous computing support',
            baiduDesc4: 'Data processing architecture for billion-scale video data, model training support',
            sanxiongDesc1: 'Built management backend with Vue + Django',
            sanxiongDesc2: 'Video upload/audit/release management system',
            sanxiongDesc3: 'Desktop tool with Vue + Electron + FFmpeg',
            qunshengDesc1: 'Vivo smartphone distribution platform (K8s + Istio)',
            qunshengDesc2: 'Built WebSocket messaging module',
            qunshengDesc3: 'SCRM platform deployment (MongoDB/Redis/gRPC)',
            qunshengDesc4: 'AWS Serverless project (Lambda + S3 + CloudFront)'
        },
        zh: {
            title: '// 关于我',
            headline: '用代码构建未来，',
            headline2: '一行一行。',
            desc1: '我是一名资深后端工程师，现居北京，热爱构建健壮的系统和 AI 驱动的应用。',
            desc2: '拥有 8 年全栈开发经验，曾在百度、vivo 和群硕软件等知名企业工作。专精后端开发、GPU 推理和 AI 应用。',
            desc3: '我学习能力强，注重细节，始终热衷于探索新技术。目前在百度从事 AI 智能体工作流、GPU 推理优化和自动化工作。',
            experience: '年工作经验',
            projects: '完成项目',
            technologies: '掌握技术',
            techTitle: '技术栈',
            languages: '编程语言',
            frameworks: '框架',
            databases: '数据库',
            tools: '工具与平台',
            aiTools: 'AI 工具',
            workExperience: '工作经历',
            baiduCompany: '北京百度',
            sanxiongCompany: '北京三熊教育',
            qunshengCompany: '武汉群硕软件',
            present: '至今',
            baiduDesc1: '数字人产品能力建设：形象生成、视频生成、视频处理流水线',
            baiduDesc2: '研发异步框架、DAG 工作流框架，60+ 版本服务上线维护',
            baiduDesc3: 'GPU 推理优化，支持 CPU/GPU 异构计算',
            baiduDesc4: '数据处理架构支持亿级视频数据处理和模型训练',
            sanxiongDesc1: '使用 Vue + Django 构建管理后台',
            sanxiongDesc2: '视频上传/审核/上线管理系统',
            sanxiongDesc3: '桌面工具：Vue + Electron + FFmpeg',
            qunshengDesc1: 'vivo 智能手机分销平台 (K8s + Istio)',
            qunshengDesc2: '构建 WebSocket 消息推送模块',
            qunshengDesc3: 'SCRM 平台部署 (MongoDB/Redis/gRPC)',
            qunshengDesc4: 'AWS Serverless 项目 (Lambda + S3 + CloudFront)'
        }
    };

    $: t = translations[$locale];

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
                {t.title}
            </p>
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                {t.headline}<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.headline2}</span>
            </h1>
        </div>
        
        <!-- About Text -->
        <div class="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
            <p>{t.desc1}</p>
            <p>{t.desc2}</p>
            <p>{t.desc3}</p>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 py-8 border-y border-gray-800">
            <div class="text-center">
                <p class="text-4xl font-bold text-white">8</p>
                <p class="text-sm text-gray-500 mt-1">{t.experience}</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-bold text-white">30+</p>
                <p class="text-sm text-gray-500 mt-1">{t.projects}</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-bold text-emerald-400">40+</p>
                <p class="text-sm text-gray-500 mt-1">{t.technologies}</p>
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
                        <div class="absolute inset-0 bg-gradient-to-br {tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        <div class="relative space-y-4">
                            <div class="text-4xl">{tool.icon}</div>
                            <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {tool.name}
                            </h3>
                            <p class="text-gray-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                            <div class="flex items-center gap-2 text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Learn more</span>
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
                <span class="text-emerald-400">//</span> {t.techTitle}
            </h2>
            
            <div class="space-y-6">
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">{t.languages}</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.languages as lang}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {lang}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">{t.frameworks}</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.frameworks as framework}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {framework}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">{t.databases}</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.databases as db}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {db}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">{t.tools}</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.tools as tool}
                            <span class="px-4 py-2 bg-gray-900/80 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-emerald-500/50 transition-colors">
                                {tool}
                            </span>
                        {/each}
                    </div>
                </div>
                
                <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">{t.aiTools}</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each techStack.aiTools as tool}
                            <span class="px-4 py-2 bg-gray-900/80 text-emerald-300 text-sm font-medium rounded-full border border-emerald-700/50 hover:border-emerald-500/50 transition-colors">
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
                <span class="text-emerald-400">//</span> {t.workExperience}
            </h2>
            
            <div class="space-y-6">
                <div class="p-6 rounded-xl bg-gray-900/50 border border-emerald-900/30 backdrop-blur-sm">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="font-semibold text-white">{t.baiduCompany}</h3>
                            <p class="text-sm text-emerald-400">2020.11 - {t.present}</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-gray-400 text-sm">
                        <p>• {t.baiduDesc1}</p>
                        <p>• {t.baiduDesc2}</p>
                        <p>• {t.baiduDesc3}</p>
                        <p>• {t.baiduDesc4}</p>
                    </div>
                </div>

                <div class="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="font-semibold text-white">{t.sanxiongCompany}</h3>
                            <p class="text-sm text-gray-500">2019.04 - 2020.11</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-gray-400 text-sm">
                        <p>• {t.sanxiongDesc1}</p>
                        <p>• {t.sanxiongDesc2}</p>
                        <p>• {t.sanxiongDesc3}</p>
                    </div>
                </div>

                <div class="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="font-semibold text-white">{t.qunshengCompany}</h3>
                            <p class="text-sm text-gray-500">2017.03 - 2019.03</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-gray-400 text-sm">
                        <p>• {t.qunshengDesc1}</p>
                        <p>• {t.qunshengDesc2}</p>
                        <p>• {t.qunshengDesc3}</p>
                        <p>• {t.qunshengDesc4}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
