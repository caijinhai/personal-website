import { writable } from 'svelte/store';

export type Locale = 'en' | 'zh';

export const locale = writable<Locale>('en');

const translations: Record<Locale, Record<string, string>> = {
	en: {
		// Nav
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.blog': 'Blog',
		'nav.github': 'GitHub',

		// Hero
		'hero.greeting': '// Backend Engineer',
		'hero.title': "Hi, I'm",
		'hero.name': 'Cesar Cai.',
		'hero.subtitle': "I build robust backend systems and AI-powered applications. Passionate about clean code, scalable architecture, and DevOps automation.",
		'hero.readBlog': 'Read My Blog',
		'hero.learnMore': 'Learn More',
		'hero.viewGithub': 'View GitHub',

		// Terminal
		'terminal.title': 'developer.json',
		'terminal.name': 'name',
		'terminal.title_label': 'title',
		'terminal.skills': 'skills',
		'terminal.passion': 'passion',
		'terminal.status': 'status',
		'terminal.value.backend': 'Backend Engineer',
		'terminal.value.build_great_products': 'Building great products',
		'terminal.value.open_to_work': 'open to work',

		// Skills
		'skills.title': '// What I Do',
		'skills.web.title': 'Web Development',
		'skills.web.desc': 'Building responsive, fast, and accessible web applications with modern frameworks like Django, Laravel, and Gin.',
		'skills.ai.title': 'AI Integration',
		'skills.ai.desc': 'Implementing AI features and automation into practical applications using Python and modern AI APIs.',
		'skills.system.title': 'System Design',
		'skills.system.desc': 'Designing scalable architectures and robust backend systems with Docker, Kubernetes, and cloud-native technologies.',
		'skills.devops.title': 'DevOps & Automation',
		'skills.devops.desc': 'Building CI/CD pipelines, automating infrastructure with Ansible, Shell, and modern DevOps tools.',

		// Tech Stack
		'tech.title': '// Tech Stack',
		'tech.languages': 'Languages',
		'tech.frameworks': 'Frameworks',
		'tech.databases': 'Databases',
		'tech.tools': 'Tools & Platforms',
		'tech.ai_tools': 'AI Tools',

		// About
		'about.title': '// About Me',
		'about.headline': 'Building the future,',
		'about.headline2': 'one line at a time.',
		'about.desc1': "I'm a backend engineer based in China, passionate about building robust systems and great products.",
		'about.desc2': "With 3-4 years of experience in full-stack development, I've worked with companies like Vivo and Qunsheng Software. I specialize in Python, PHP, Go, and modern backend technologies.",
		'about.desc3': "I'm a quick learner, detail-oriented, and always eager to explore new technologies. Currently focusing on AI applications and automation.",
		'about.experience': 'Years Experience',
		'about.projects': 'Projects Completed',
		'about.technologies': 'Technologies Mastered',

		// Blog
		'blog.title': '// Blog',
		'blog.headline': 'Thoughts &',
		'blog.headline2': 'Discoveries',
		'blog.subtitle': 'Writing about backend development, AI technologies, DevOps, and lessons learned along the way.',
		'blog.viewAll': 'View all →',
		'blog.noPosts': 'No posts yet',
		'blog.comingSoon': 'Stay tuned!',
		'blog.readMore': 'Read more →',

		// Article Detail
		'article.back': '← Back to Blog',
		'article.published': 'Published',
		'article.updated': 'Updated',

		// CTA
		'cta.title': "Let's build something great together",
		'cta.subtitle': 'Have a project in mind? Check out my GitHub.',
		'cta.github': 'View GitHub',

		// Footer
		'footer.copyright': 'All rights reserved.',
	},

	zh: {
		// Nav
		'nav.home': '首页',
		'nav.about': '关于',
		'nav.blog': '博客',
		'nav.github': 'GitHub',

		// Hero
		'hero.greeting': '// 后端工程师',
		'hero.title': '你好，我是',
		'hero.name': '蔡金海。',
		'hero.subtitle': '我构建强大的后端系统和 AI 应用。热爱简洁代码、可扩展架构和 DevOps 自动化。',
		'hero.readBlog': '阅读博客',
		'hero.learnMore': '了解更多',
		'hero.viewGithub': '查看 GitHub',

		// Terminal
		'terminal.title': 'developer.json',
		'terminal.name': '姓名',
		'terminal.title_label': '职位',
		'terminal.skills': '技能',
		'terminal.passion': '热情',
		'terminal.status': '状态',
		'terminal.value.backend': '后端工程师',
		'terminal.value.build_great_products': '打造优秀产品',
		'terminal.value.open_to_work': '寻求工作机会',

		// Skills
		'skills.title': '// 我做什么',
		'skills.web.title': 'Web 开发',
		'skills.web.desc': '使用 Django、Laravel、Gin 等现代框架构建响应式、快速、可访问的 Web 应用。',
		'skills.ai.title': 'AI 集成',
		'skills.ai.desc': '使用 Python 和现代 AI API 将 AI 功能实现到实际应用中。',
		'skills.system.title': '系统设计',
		'skills.system.desc': '使用 Docker、Kubernetes 和云原生技术设计可扩展架构和健壮的后端系统。',
		'skills.devops.title': 'DevOps 与自动化',
		'skills.devops.desc': '构建 CI/CD 管道，使用 Ansible、Shell 和现代 DevOps 工具实现基础设施自动化。',

		// Tech Stack
		'tech.title': '// 技术栈',
		'tech.languages': '编程语言',
		'tech.frameworks': '框架',
		'tech.databases': '数据库',
		'tech.tools': '工具与平台',
		'tech.ai_tools': 'AI 工具',

		// About
		'about.title': '// 关于我',
		'about.headline': '用代码构建未来，',
		'about.headline2': '一行一行。',
		'about.desc1': '我是一名后端工程师，热爱构建健壮的系统和优秀的产品。',
		'about.desc2': '拥有 3-4 年全栈开发经验，曾在 vivo 和群硕软件等公司工作。我专精于 Python、PHP、Go 和现代后端技术。',
		'about.desc3': '我学习能力强，注重细节，始终热衷于探索新技术。目前专注于 AI 应用和自动化。',
		'about.experience': '年工作经验',
		'about.projects': '完成项目',
		'about.technologies': '掌握技术',

		// Blog
		'blog.title': '// 博客',
		'blog.headline': '思考与',
		'blog.headline2': '发现',
		'blog.subtitle': '撰写关于后端开发、AI 技术、DevOps 和经验教训的文章。',
		'blog.viewAll': '查看全部 →',
		'blog.noPosts': '暂无文章',
		'blog.comingSoon': '敬请期待！',
		'blog.readMore': '阅读更多 →',

		// Article Detail
		'article.back': '← 返回博客',
		'article.published': '发布于',
		'article.updated': '更新于',

		// CTA
		'cta.title': '让我们一起构建伟大的产品',
		'cta.subtitle': '有项目想法？来看看我的 GitHub。',
		'cta.github': '查看 GitHub',

		// Footer
		'footer.copyright': '版权所有。',
	}
};

export function t(key: string): string {
	let currentLocale: Locale = 'en';
	locale.subscribe((v) => (currentLocale = v))();
	return translations[currentLocale][key] || key;
}

export function toggleLocale() {
	locale.update((l) => (l === 'en' ? 'zh' : 'en'));
}
